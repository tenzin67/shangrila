import React, { useState, useEffect } from 'react';
import { useCart } from '@/Hooks/useCart';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import CartSidebar from '@/Components/CartSidebar';

export default function Shop({ auth, products: dbProducts = [] }) {
    const { url } = usePage();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        setSearchQuery(q || '');
        if (q) {
            setActiveCategory('All');
        }
    }, [url]);

    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart
    } = useCart();

    // Build categories from database products
    const uniqueCategories = [...new Set(dbProducts.map(p => p.category))];
    const categories = ['All', ...uniqueCategories];

    // Convert database products to expected format
    const products = dbProducts.map(product => ({
        id: product.id,
        name: product.name,
        jpCategory: product.japanese_name,
        category: product.category,
        price: product.price / 100, // Adjust if needed
        unit: product.unit,
        image: product.image_url
    }));

    const displayProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                    <p className="text-gray-600 max-w-2xl">Browse our wide selection of fresh produce, pantry staples, and specialty items.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
                {/* Sidebar Categories */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="font-bold text-lg mb-4 px-2">Categories</h3>
                        <nav className="space-y-1">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${activeCategory === category
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">{activeCategory}</h2>
                            <span className="text-sm text-gray-500">{displayProducts.length} items</span>
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
                            <p className="text-gray-500">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
