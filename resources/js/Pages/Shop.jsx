import React, { useState } from 'react';
import { useCart } from '@/Hooks/useCart';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import CartSidebar from '@/Components/CartSidebar';

export default function Shop({ auth }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart
    } = useCart();

    const categories = [
        "All",
        "Dairy & Eggs",
        "Cheese",
        "Produce",
        "Condiments",
        "Canned Goods",
        "Asian Grocery",
        "International",
        "Beverages",
        "Snacks & Treats",
        "Bulk Foods"
    ];

    // Mock Data organized by category
    const products = [
        // Dairy & Eggs
        { id: 'd1', name: 'Organic Whole Milk', category: 'Dairy & Eggs', price: 4.50, unit: '1 Gallon', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400' },
        { id: 'd2', name: 'Free Range Eggs', category: 'Dairy & Eggs', price: 6.00, unit: 'Dozen', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400' },
        { id: 'd3', name: 'Greek Yogurt', category: 'Dairy & Eggs', price: 5.25, unit: '32oz', image: 'https://images.unsplash.com/photo-1488477181946-6428a029177b?auto=format&fit=crop&q=80&w=400' },

        // Cheese
        { id: 'c1', name: 'Aged Cheddar', category: 'Cheese', price: 8.99, unit: 'Block', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=400' },
        { id: 'c2', name: 'French Brie', category: 'Cheese', price: 12.50, unit: 'Wheel', image: 'https://images.unsplash.com/photo-1486297678162-8e10398000b9?auto=format&fit=crop&q=80&w=400' },
        { id: 'c3', name: 'Parmigiano Reggiano', category: 'Cheese', price: 15.00, unit: 'Wedge', image: 'https://images.unsplash.com/photo-1560155016-bd4879ae8f21?auto=format&fit=crop&q=80&w=400' },

        // Produce
        { id: 'p1', name: 'Fresh Avocados', category: 'Produce', price: 2.50, unit: 'Each', image: 'https://images.unsplash.com/photo-1523049673856-428689c8ae89?auto=format&fit=crop&q=80&w=400' },
        { id: 'p2', name: 'Honeycrisp Apples', category: 'Produce', price: 3.99, unit: 'lb', image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=400' },
        { id: 'p3', name: 'Organic Kale', category: 'Produce', price: 2.99, unit: 'Bunch', image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&q=80&w=400' },

        // Condiments
        { id: 'co1', name: 'Artisan Ketchup', category: 'Condiments', price: 5.50, unit: 'Bottle', image: 'https://images.unsplash.com/photo-1607594367356-07755b413038?auto=format&fit=crop&q=80&w=400' },
        { id: 'co2', name: 'Dijon Mustard', category: 'Condiments', price: 4.25, unit: 'Jar', image: 'https://images.unsplash.com/photo-1555547432-d856b3e70d4c?auto=format&fit=crop&q=80&w=400' },

        // Canned Goods
        { id: 'cn1', name: 'Organic Chickpeas', category: 'Canned Goods', price: 1.99, unit: 'Can', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980fa1?auto=format&fit=crop&q=80&w=400' },
        { id: 'cn2', name: 'Diced Tomatoes', category: 'Canned Goods', price: 2.50, unit: 'Can', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=400' },

        // Asian Grocery
        { id: 'ag1', name: 'Sushi Rice', category: 'Asian Grocery', price: 18.00, unit: '5kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
        { id: 'ag2', name: 'Soy Sauce', category: 'Asian Grocery', price: 4.99, unit: 'Bottle', image: 'https://images.unsplash.com/photo-1580980209427-0466432b406e?auto=format&fit=crop&q=80&w=400' },
        { id: 'ag3', name: 'Pocky Sticks', category: 'Asian Grocery', price: 2.50, unit: 'Box', image: 'https://images.unsplash.com/photo-1629853346510-7e6164d9db5d?auto=format&fit=crop&q=80&w=400' },

        // International
        { id: 'in1', name: 'Italian Pasta', category: 'International', price: 3.50, unit: '500g', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=400' },
        { id: 'in2', name: 'Curry Paste', category: 'International', price: 4.00, unit: 'Jar', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400' },

        // Beverages
        { id: 'bv1', name: 'Sparkling Water', category: 'Beverages', price: 1.50, unit: 'Can', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=400' },
        { id: 'bv2', name: 'Oat Milk', category: 'Beverages', price: 5.00, unit: 'Carton', image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=400' },
        { id: 'bv3', name: 'Green Tea', category: 'Beverages', price: 8.50, unit: 'Box', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400' },

        // Snacks & Treats
        { id: 'sn1', name: 'Rice Crackers', category: 'Snacks & Treats', price: 3.99, unit: 'Bag', image: 'https://images.unsplash.com/photo-1599639668352-f9496b865664?auto=format&fit=crop&q=80&w=400' },
        { id: 'sn2', name: 'Dark Chocolate', category: 'Snacks & Treats', price: 4.50, unit: 'Bar', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=400' },

        // Bulk Foods
        { id: 'bf1', name: 'Almonds', category: 'Bulk Foods', price: 12.00, unit: 'lb', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=400' },
        { id: 'bf2', name: 'Quinoa', category: 'Bulk Foods', price: 6.50, unit: 'lb', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
    ];

    const displayProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

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
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">{activeCategory}</h2>
                        <span className="text-sm text-gray-500">{displayProducts.length} items</span>
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
