<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'japanese_name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'category' => 'required|string|max:50',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
            'image_url' => 'required|url',
        ]);

        Product::create($validated);

        return redirect()->back()->with('success', 'Product added successfully!');
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'japanese_name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'category' => 'required|string|max:50',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
            'image_url' => 'required|url',
        ]);

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully!');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }

    public function adjustStock(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'adjustment' => 'required|integer'
        ]);

        $newQuantity = $product->stock_quantity + $validated['adjustment'];

        // Don't allow negative stock
        if ($newQuantity < 0) {
            $newQuantity = 0;
        }

        $product->update(['stock_quantity' => $newQuantity]);

        return redirect()->back();
    }
}
