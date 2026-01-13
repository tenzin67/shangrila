<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Search
        if ($request->has('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // Category Filter
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        // Price Range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price * 100); // Storage in cents? Need to confirm.
            // Previous code divided by 100 in frontend, so DB is likely cents.
            // Let's verify Product model or previous usage. 
            // Shop.jsx: price: product.price / 100
            // So DB is cents. Min price input is likely dollars. So * 100.
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price * 100);
        }

        // Sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return Inertia::render('Shop', [
            'products' => $query->get(), // We can paginate later if needed
            'filters' => $request->all(['q', 'category', 'min_price', 'max_price', 'sort']),
            'categories' => Product::select('category')->distinct()->pluck('category')->prepend('All'),
        ]);
    }

    // API for Instant Search Suggestions
    public function searchSuggestions(Request $request)
    {
        $search = $request->query('q');
        if (!$search) {
            return response()->json([]);
        }

        $products = Product::where('name', 'like', "%{$search}%")
            ->orWhere('category', 'like', "%{$search}%")
            ->limit(5)
            ->get(['id', 'name', 'image_url', 'price', 'category']);

        return response()->json($products);
    }
}
