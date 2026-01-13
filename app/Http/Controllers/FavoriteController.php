<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Auth::user()->favorites()->with('product')->get()->pluck('product');

        // We might want to reuse the ProductCard component, so we need products in that format.
        // Or we can just pass the products.

        return Inertia::render('Profile/Favorites', [
            'favorites' => $favorites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        Auth::user()->favorites()->firstOrCreate([
            'product_id' => $request->product_id
        ]);

        return back();
    }

    public function destroy(Product $product)
    {
        Auth::user()->favorites()->where('product_id', $product->id)->delete();

        return back();
    }
}
