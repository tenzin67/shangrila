<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOrderWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $product;
    protected $order;

    protected function setUp(): void
    {
        parent::setUp();

        // Create Admin User
        $this->admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        // Force admin check to pass (mocking middleware behavior if needed, or ensuring user has correct attributes)
        // If middleware checks $user->is_admin, we need to ensure that.
        // Let's assume 'role' => 'admin' is sufficient or we can actAs($admin).

        // Create Product with Stock
        $this->product = Product::create([
            'name' => 'Test Product',
            // 'japanese_name' => 'テスト', // Removed column
            'price' => 100,
            'unit' => 'item', // Add required field
            //'description' => 'Test Desc', // Remove non-existent field
            'image_url' => 'http://example.com/test.jpg', // correct column
            'stock_quantity' => 10, // correct column
            'category' => 'Test'
        ]);

        // Create Order
        $this->order = Order::create([
            'user_id' => $this->admin->id,
            'order_number' => 'ORD-TEST-001',
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'shipping_address' => ['address' => '123 St', 'city' => 'City', 'zip' => '12345'],
            'total_amount' => 100,
            'status' => 'pending',
            'payment_method' => 'cod',
            'payment_status' => 'pending'
        ]);

        // Create Order Item
        OrderItem::create([
            'order_id' => $this->order->id,
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'product_image' => $this->product->image_url,
            'quantity' => 1,
            'price' => 100,
            'subtotal' => 100,
        ]);
    }

    public function test_admin_can_confirm_order()
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.orders.confirm', $this->order->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $this->order->id,
            'status' => 'confirmed'
        ]);

        // Check stock was reserved
        $this->assertDatabaseHas('products', [
            'id' => $this->product->id,
            'stock_quantity' => 9 // 10 - 1
        ]);
    }

    public function test_admin_can_process_order()
    {
        $this->order->update(['status' => 'confirmed']);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.orders.process', $this->order->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $this->order->id,
            'status' => 'processing'
        ]);
    }

    public function test_admin_can_ship_order()
    {
        $this->order->update(['status' => 'processing']);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.orders.ship', $this->order->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $this->order->id,
            'status' => 'shipped'
        ]);
    }

    public function test_admin_can_deliver_order()
    {
        $this->order->update(['status' => 'shipped']);

        $response = $this->actingAs($this->admin)
            ->post(route('admin.orders.deliver', $this->order->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $this->order->id,
            'status' => 'delivered'
        ]);
    }

    public function test_cannot_skip_status()
    {
        // Pending -> Shipped should fail
        $response = $this->actingAs($this->admin)
            ->post(route('admin.orders.ship', $this->order->id));

        // Should have error in session
        $response->assertSessionHasErrors('error');
        $this->assertDatabaseHas('orders', [
            'id' => $this->order->id,
            'status' => 'pending'
        ]);
    }
}
