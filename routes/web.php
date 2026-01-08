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

    Route::get('/shop', function () {
        $products = \App\Models\Product::orderBy('created_at', 'desc')->get();
        return Inertia::render('Shop', [
            'products' => $products
        ]);
    })->name('shop');

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

    Route::get('/admin/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name('admin.orders');

    Route::post('/admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
});

// Route::get('/Home', function () {
//     return Inertia::render('Home');
// })->middleware(['auth', 'verified'])->name('hashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/checkout', function () {
        return Inertia::render('Checkout');
    });

    Route::get('/order-success', function () {
        return Inertia::render('OrderSuccess');
    });
});

Route::post('/subscribe', [App\Http\Controllers\SubscriberController::class, 'store'])->name('subscribe');

require __DIR__ . '/auth.php';
