<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes (Redirect Admins to Dashboard)
Route::middleware(['admin.redirect'])->group(function () {
    Route::get('/', function () {
        $products = \App\Models\Product::orderBy('created_at', 'desc')->get();
        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'products' => $products
        ]);
    });

    Route::get('/shop', [\App\Http\Controllers\ShopController::class, 'index'])->name('shop');
    Route::get('/api/products/search', [\App\Http\Controllers\ShopController::class, 'searchSuggestions'])->name('api.products.search');

    Route::get('/cafe', function () {
        return Inertia::render('Cafe');
    })->name('cafe');

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');
});

use App\Http\Controllers\AdminAuthenticatedSessionController;

// Admin Auth Routes
// Admin Auth Routes
Route::get('/admin/login', [AdminAuthenticatedSessionController::class, 'create'])->name('admin.login');
Route::post('/admin/login', [AdminAuthenticatedSessionController::class, 'store'])->name('admin.login.store');

// Admin Dashboard (Protected)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', function () {
        $products = \App\Models\Product::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Dashboard', [
            'products' => $products
        ])->withViewData([
                    'cache-control' => 'no-cache, no-store, must-revalidate'
                ]);
    })->name('admin.dashboard');

    Route::get('/admin/products', function () {
        $products = \App\Models\Product::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Products', [
            'products' => $products,
            'timestamp' => time()
        ])->withViewData([
                    'cache-control' => 'no-cache, no-store, must-revalidate'
                ]);
    })->name('admin.products');

    Route::post('/admin/products', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('admin.products.store');
    Route::put('/admin/products/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('admin.products.destroy');
    Route::post('/admin/products/{id}/adjust-stock', [\App\Http\Controllers\Admin\ProductController::class, 'adjustStock'])->name('admin.products.adjust-stock');

    Route::get('/admin/categories', function () {
        return Inertia::render('Admin/Categories');
    })->name('admin.categories');

    // Order management routes
    Route::get('/admin/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('admin.orders');
    Route::get('/admin/orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'show'])->name('admin.orders.show');

    // Order status transitions
    Route::post('/admin/orders/{order}/confirm', [\App\Http\Controllers\Admin\OrderController::class, 'confirmOrder'])->name('admin.orders.confirm');
    Route::post('/admin/orders/{order}/process', [\App\Http\Controllers\Admin\OrderController::class, 'processOrder'])->name('admin.orders.process');
    Route::post('/admin/orders/{order}/ship', [\App\Http\Controllers\Admin\OrderController::class, 'shipOrder'])->name('admin.orders.ship');
    Route::post('/admin/orders/{order}/deliver', [\App\Http\Controllers\Admin\OrderController::class, 'deliverOrder'])->name('admin.orders.deliver');
    Route::post('/admin/orders/{order}/cancel', [\App\Http\Controllers\Admin\OrderController::class, 'cancelOrder'])->name('admin.orders.cancel');

    // Bulk actions
    Route::post('/admin/orders/bulk-confirm', [\App\Http\Controllers\Admin\OrderController::class, 'bulkConfirm'])->name('admin.orders.bulk-confirm');
    Route::post('/admin/orders/bulk-cancel', [\App\Http\Controllers\Admin\OrderController::class, 'bulkCancel'])->name('admin.orders.bulk-cancel');

    Route::post('/admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
});

// Route::get('/Home', function () {
//     return Inertia::render('Home');
// })->middleware(['auth', 'verified'])->name('hashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/account', function () {
        return Inertia::render('Profile/Dashboard');
    })->name('profile.dashboard');

    Route::get('/account/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::get('/account/orders/{order}', [\App\Http\Controllers\OrderController::class, 'show'])->name('orders.show');

    Route::get('/checkout', function () {
        $addresses = Auth::user()->addresses()->orderBy('is_default', 'desc')->get();
        return Inertia::render('Checkout', [
            'addresses' => $addresses
        ]);
    })->name('checkout');

    Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
    Route::get('/order-success/{order}', [\App\Http\Controllers\OrderController::class, 'success'])->name('order.success');

    // Favorites
    Route::get('/account/favorites', [\App\Http\Controllers\FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [\App\Http\Controllers\FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites/{product}', [\App\Http\Controllers\FavoriteController::class, 'destroy'])->name('favorites.destroy');

    // Addresses
    Route::get('/account/addresses', [\App\Http\Controllers\AddressController::class, 'index'])->name('addresses.index');
    Route::post('/addresses', [\App\Http\Controllers\AddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{address}', [\App\Http\Controllers\AddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{address}', [\App\Http\Controllers\AddressController::class, 'destroy'])->name('addresses.destroy');
});

Route::post('/subscribe', [App\Http\Controllers\SubscriberController::class, 'store'])->name('subscribe');

require __DIR__ . '/auth.php';
