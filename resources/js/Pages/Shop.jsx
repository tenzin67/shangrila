import React, { useState, useEffect } from 'react';
import { useCart } from '@/Hooks/useCart';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import CartSidebar from '@/Components/CartSidebar';
import InstantSearch from '@/Components/InstantSearch';

export default function Shop({ auth, products: dbProducts = [], filters = {}, categories = [] }) {
    const { url } = usePage();

    // State for inputs
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [sort, setSort] = useState(filters.sort || 'newest');

    // Debounce price or apply on button click
    const applyFilters = () => {
        router.get(route('shop'), {
            ...filters,
            min_price: minPrice,
            max_price: maxPrice,
            sort: sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (category) => {
        router.get(route('shop'), {
            ...filters,
            category: category === 'All' ? null : category,
            page: 1, // Reset page
        }, {
            preserveState: true,
        });
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        router.get(route('shop'), {
            ...filters,
            sort: e.target.value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart
    } = useCart();

    // Mapping products (Controller usually returns raw DB objects)
    const displayProducts = dbProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price / 100,
        unit: product.unit,
        image: product.image_url
    }));

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Shop" />

            <Navbar
                auth={auth}
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onOpenCart={() => setIsCartOpen(true)}
            />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />

            {/* Header */}
            <div className="bg-[#F3EEEA] py-12 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop Groceries</h1>
                    <p className="text-gray-600 max-w-2xl mb-8">Browse our wide selection of fresh produce, pantry staples, and specialty items.</p>

                    {/* Instant Search Bar */}
                    <div className="max-w-xl">
                        <InstantSearch />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
                {/* Sidebar Categories & Filters */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 px-2">Categories</h3>
                        <nav className="space-y-1">
                            {categories.map(category => {
                                const isActive = filters.category === category || (!filters.category && category === 'All');
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 px-2">Price Range</h3>
                        <div className="px-2 space-y-4">
                            <div className="flex gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Min</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Max</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary"
                                        placeholder="1000"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={applyFilters}
                                className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">{filters.category || 'All Products'}</h2>
                            <span className="text-sm text-gray-500">{dbProducts.length} items</span>
                        </div>

                        {/* Sorting */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-500">Sort by:</label>
                            <select
                                value={sort}
                                onChange={handleSortChange}
                                className="border-none bg-gray-50 rounded-lg text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <option value="newest">Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>

                    {displayProducts.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500">No products found matching your filters.</p>
                            <button
                                onClick={() => router.get(route('shop'))}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
