<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class InventoryService
{
    /**
     * Reserve stock for an order (deduct from inventory)
     *
     * @throws \Exception if insufficient stock
     */
    public function reserveStock(Order $order): void
    {
        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                if (!$item->product_id) {
                    continue; // Skip if product was deleted
                }

                $product = Product::lockForUpdate()->find($item->product_id);

                if (!$product) {
                    continue; // Product no longer exists
                }

                if ($product->stock_quantity < $item->quantity) {
                    throw new \Exception("Insufficient stock for product: {$product->name}. Available: {$product->stock_quantity}, Required: {$item->quantity}");
                }

                // Deduct stock
                $product->decrement('stock_quantity', $item->quantity);
            }
        });
    }

    /**
     * Release stock for an order (restore inventory)
     */
    public function releaseStock(Order $order): void
    {
        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                if (!$item->product_id) {
                    continue; // Skip if product was deleted
                }

                $product = Product::lockForUpdate()->find($item->product_id);

                if (!$product) {
                    continue; // Product no longer exists
                }

                // Restore stock
                $product->increment('stock_quantity', $item->quantity);
            }
        });
    }

    /**
     * Check if all items in order are available in stock
     */
    public function checkAvailability(Order $order): array
    {
        $unavailable = [];

        foreach ($order->items as $item) {
            if (!$item->product_id) {
                continue;
            }

            $product = Product::find($item->product_id);

            if (!$product) {
                $unavailable[] = [
                    'product_name' => $item->product_name,
                    'reason' => 'Product no longer exists',
                ];
                continue;
            }

            if ($product->stock_quantity < $item->quantity) {
                $unavailable[] = [
                    'product_name' => $product->name,
                    'required' => $item->quantity,
                    'available' => $product->stock_quantity,
                    'reason' => "Insufficient stock",
                ];
            }
        }

        return $unavailable;
    }
}
