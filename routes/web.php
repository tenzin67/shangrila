<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/Home', function () {
//     return Inertia::render('Home');
// })->middleware(['auth', 'verified'])->name('hashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/shop', function () {
    return Inertia::render('Shop');
});

Route::get('/cafe', function () {
    return Inertia::render('Cafe');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});

Route::get('/order-success', function () {
    return Inertia::render('OrderSuccess');
});

require __DIR__ . '/auth.php';
