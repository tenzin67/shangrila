<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\InventoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $inventoryService;

    public function __construct(InventoryService $inventoryService)
    {
        $this->inventoryService = $inventoryService;
    }

    /**
     * Display a listing of orders
     */
    public function index(Request $request)
    {
        $query = Order::with(['items', 'user'])
            ->orderBy('created_at', 'desc');

        // Filter by status if provided
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by order number or customer name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%");
            });
        }

        $orders = $query->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Display the specified order
     */
    public function show(Order $order)
    {
        $order->load(['items.product', 'user', 'statusHistory.changedBy', 'cancelledBy']);

        return Inertia::render('Admin/OrderDetail', [
            'order' => $order,
        ]);
    }

    /**
     * Confirm order (pending → confirmed) and reserve stock
     */
    public function confirmOrder(Order $order)
    {
        if (!$order->canTransitionTo(Order::STATUS_CONFIRMED)) {
            return back()->withErrors(['error' => 'Cannot confirm this order in its current status.']);
        }

        try {
            DB::beginTransaction();

            // Check stock availability
            $unavailable = $this->inventoryService->checkAvailability($order);
            if (!empty($unavailable)) {
                DB::rollBack();
                return back()->withErrors([
                    'error' => 'Some items are out of stock: ' . collect($unavailable)->pluck('product_name')->join(', ')
                ]);
            }

            // Reserve stock
            $this->inventoryService->reserveStock($order);

            // Transition status
            $order->transitionTo(Order::STATUS_CONFIRMED, Auth::user(), 'Order confirmed and stock reserved');

            DB::commit();

            return back()->with('success', 'Order confirmed successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to confirm order: ' . $e->getMessage()]);
        }
    }

    /**
     * Process order (confirmed → processing)
     */
    public function processOrder(Order $order)
    {
        if (!$order->canTransitionTo(Order::STATUS_PROCESSING)) {
            return back()->withErrors(['error' => 'Cannot process this order in its current status.']);
        }

        $order->transitionTo(Order::STATUS_PROCESSING, Auth::user(), 'Order processing started');

        return back()->with('success', 'Order moved to processing.');
    }

    /**
     * Ship order (processing → shipped)
     */
    public function shipOrder(Order $order)
    {
        if (!$order->canTransitionTo(Order::STATUS_SHIPPED)) {
            return back()->withErrors(['error' => 'Cannot ship this order in its current status.']);
        }

        $order->transitionTo(Order::STATUS_SHIPPED, Auth::user(), 'Order shipped');

        return back()->with('success', 'Order marked as shipped.');
    }

    /**
     * Deliver order (shipped → delivered)
     */
    public function deliverOrder(Order $order)
    {
        if (!$order->canTransitionTo(Order::STATUS_DELIVERED)) {
            return back()->withErrors(['error' => 'Cannot deliver this order in its current status.']);
        }

        $order->transitionTo(Order::STATUS_DELIVERED, Auth::user(), 'Order delivered');

        return back()->with('success', 'Order marked as delivered.');
    }

    /**
     * Cancel order with reason
     */
    public function cancelOrder(Request $request, Order $order)
    {
        $validated = $request->validate([
            'reason' => 'required|string|min:10|max:500',
        ]);

        if (!$order->canBeCancelled()) {
            return back()->withErrors(['error' => 'This order cannot be cancelled in its current status.']);
        }

        try {
            DB::beginTransaction();

            // Release stock if order was confirmed
            if ($order->status === Order::STATUS_CONFIRMED) {
                $this->inventoryService->releaseStock($order);
            }

            // Update order
            $order->update([
                'status' => Order::STATUS_CANCELLED,
                'cancelled_by' => Auth::id(),
                'cancel_reason' => $validated['reason'],
                'cancelled_at' => now(),
            ]);

            // Log status change
            \App\Models\OrderStatusHistory::create([
                'order_id' => $order->id,
                'old_status' => $order->getOriginal('status'),
                'new_status' => Order::STATUS_CANCELLED,
                'changed_by' => Auth::id(),
                'notes' => 'Order cancelled: ' . $validated['reason'],
            ]);

            DB::commit();

            return back()->with('success', 'Order cancelled successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to cancel order: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk confirm orders
     */
    public function bulkConfirm(Request $request)
    {
        $validated = $request->validate([
            'order_ids' => 'required|array|min:1',
            'order_ids.*' => 'required|integer|exists:orders,id',
        ]);

        $orders = Order::whereIn('id', $validated['order_ids'])->get();
        $confirmed = 0;
        $errors = [];

        foreach ($orders as $order) {
            if (!$order->canTransitionTo(Order::STATUS_CONFIRMED)) {
                $errors[] = "Order {$order->order_number} cannot be confirmed";
                continue;
            }

            try {
                DB::beginTransaction();

                $unavailable = $this->inventoryService->checkAvailability($order);
                if (!empty($unavailable)) {
                    $errors[] = "Order {$order->order_number} has items out of stock";
                    DB::rollBack();
                    continue;
                }

                $this->inventoryService->reserveStock($order);
                $order->transitionTo(Order::STATUS_CONFIRMED, Auth::user(), 'Bulk confirmed');

                DB::commit();
                $confirmed++;

            } catch (\Exception $e) {
                DB::rollBack();
                $errors[] = "Order {$order->order_number}: " . $e->getMessage();
            }
        }

        $message = "$confirmed order(s) confirmed successfully.";
        if (!empty($errors)) {
            $message .= " Errors: " . implode(', ', $errors);
        }

        return back()->with('success', $message);
    }

    /**
     * Bulk cancel orders
     */
    public function bulkCancel(Request $request)
    {
        $validated = $request->validate([
            'order_ids' => 'required|array|min:1',
            'order_ids.*' => 'required|integer|exists:orders,id',
            'reason' => 'required|string|min:10|max:500',
        ]);

        $orders = Order::whereIn('id', $validated['order_ids'])->get();
        $cancelled = 0;
        $errors = [];

        foreach ($orders as $order) {
            if (!$order->canBeCancelled()) {
                $errors[] = "Order {$order->order_number} cannot be cancelled";
                continue;
            }

            try {
                DB::beginTransaction();

                if ($order->status === Order::STATUS_CONFIRMED) {
                    $this->inventoryService->releaseStock($order);
                }

                $order->update([
                    'status' => Order::STATUS_CANCELLED,
                    'cancelled_by' => Auth::id(),
                    'cancel_reason' => $validated['reason'],
                    'cancelled_at' => now(),
                ]);

                \App\Models\OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $order->getOriginal('status'),
                    'new_status' => Order::STATUS_CANCELLED,
                    'changed_by' => Auth::id(),
                    'notes' => 'Bulk cancelled: ' . $validated['reason'],
                ]);

                DB::commit();
                $cancelled++;

            } catch (\Exception $e) {
                DB::rollBack();
                $errors[] = "Order {$order->order_number}: " . $e->getMessage();
            }
        }

        $message = "$cancelled order(s) cancelled successfully.";
        if (!empty($errors)) {
            $message .= " Errors: " . implode(', ', $errors);
        }

        return back()->with('success', $message);
    }
}
