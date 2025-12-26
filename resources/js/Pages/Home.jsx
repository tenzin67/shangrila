import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import CategoryCard from '@/Components/CategoryCard';
import MenuSection from '@/Components/MenuSection';
import CartSidebar from '@/Components/CartSidebar';
import { useCart } from '@/Hooks/useCart';

export default function Home({ auth }) {
    const featuredProducts = [
        {
            id: 1,
            name: 'Organic Matcha',
            category: 'Tea',
            jpCategory: '抹茶',
            price: 24.00,
            unit: '30g',
            image: 'https://images.unsplash.com/photo-1582793141158-47c109723871?auto=format&fit=crop&q=80&w=600',
            badge: 'Limited',
            description: 'Premium ceremonial grade matcha.'
        },
        {
            id: 2,
            name: 'White Miso',
            category: 'Pantry',
            jpCategory: '味噌',
            price: 12.50,
            unit: '500g',
            image: 'https://images.unsplash.com/photo-1604153922849-015822f67272?auto=format&fit=crop&q=80&w=600',
            description: 'Sweet fermented soybean paste.'
        },
        {
            id: 3,
            name: 'Yuzu Citrus',
            category: 'Fresh Produce',
            jpCategory: '柚子',
            price: 8.00,
            unit: '3 pcs',
            image: 'https://images.unsplash.com/photo-1621458237353-44f37803e9e1?auto=format&fit=crop&q=80&w=600',
            badge: 'New',
            description: 'Aromatic citrus fruit.'
        },
    ];

    const additionalProducts = [
        {
            id: 4,
            name: 'Leafy Spinach',
            category: 'Vegetables',
            jpCategory: 'ほうれん草',
            price: 4.50,
            unit: 'Bundle',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600',
            description: 'Fresh organic spinach from local farms.'
        },
        {
            id: 5,
            name: 'Soba Noodles',
            category: 'Pantry',
            jpCategory: '蕎麦',
            price: 6.00,
            unit: '300g',
            image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=600',
            description: 'Buckwheat noodles, perfect for hot or cold dishes.'
        },
    ];

    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount
    } = useCart();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Home" />

            <Navbar
                auth={auth}
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
            />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />

            {/* Hero Section - California Cafe Style */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
                <div className="bg-emerald-100/80 rounded-[.5rem] p-8 md:p-12 relative overflow-hidden shadow-sm border border-emerald-100/50">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-green-50/30 opacity-60 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="max-w-xl py-4">
                            {/* Badge */}
                            <div className="inline-flex rounded-xl items-center space-x-2 bg-white border border-emerald-100 px-4 py-1.5 mb-6 shadow-sm">
                                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L14.2451 9.75486L22 12L14.2451 14.2451L12 22L9.75486 14.2451L2 12L9.75486 9.75486L12 2Z" fill="currentColor" />
                                </svg>
                                <span className="text-sm font-bold text-emerald-800 tracking-wide">Now Open</span>
                            </div>

                            <h1 className="text-4xl sm:text-2xl font-sans font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                                Experience Our California Café
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                                Where Japanese tradition meets California vibes. Artisan coffee, specialty drinks, and freshly baked pies in a sun-filled space.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <Link href="/cafe" className="bg-[#00A86B] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#008f5b] transition-colors flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8h9v7a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4V8z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10h2a2 2 0 0 1 0 4h-2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3c0 1 1 1 1 2s-1 1-1 2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c0 1 1 1 1 2s-1 1-1 2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 3c0 1 1 1 1 2s-1 1-1 2" />
                                    </svg>
                                    View Café Menu
                                </Link>
                                <Link href="/about" className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold shadow-sm border border-gray-200 hover:border-gray-300 transition-colors flex items-center group">
                                    Learn More
                                    <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center divide-x divide-gray-200 border-t border-gray-200 pt-6">
                                <div className="pr-6">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Open Daily</span>
                                    <span className="block text-lg font-bold text-gray-900">7AM - 7PM</span>
                                </div>
                                <div className="pl-6">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Special Offer</span>
                                    <span className="block text-lg font-medium text-gray-900">Free matcha sample*</span>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-full min-h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                                alt="Sunny California Cafe"
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Card 1: Visit Us */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Visit Us</h3>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">123 Japanese Ave, San Francisco, CA 94102</p>
                    </div>
                </div>

                {/* Card 2: Store Hours */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Store Hours</h3>
                        <p className="text-gray-500 text-sm mt-1">Mon-Sun: 9AM - 8PM</p>
                    </div>
                </div>

                {/* Card 3: Fresh & Organic (Green Style) */}
                <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00A86B] flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Fresh & Organic</h3>
                        <p className="text-gray-600 text-sm mt-1">Locally sourced when possible</p>
                    </div>
                </div>
            </div>

            {/* Shop Products - Japanese Style Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-24">
                <div className="flex items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mr-4">Shop Products</h2>
                    <span className="text-emerald-500 font-bold">商品</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard
                        product={{
                            id: 'sp-1',
                            name: 'Organic Vegetables',
                            jpCategory: '有機野菜',
                            price: 6.80,
                            unit: '500g',
                            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
                        }}
                        onAddToCart={addToCart}
                    />
                    <ProductCard
                        product={{
                            id: 'sp-2',
                            name: 'Premium Rice',
                            jpCategory: 'プレミアム米',
                            price: 12.00,
                            unit: '1kg',
                            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600'
                        }}
                        onAddToCart={addToCart}
                    />
                    <ProductCard
                        product={{
                            id: 'sp-3',
                            name: 'Sencha Green Tea',
                            jpCategory: '煎茶',
                            price: 8.50,
                            unit: '100g',
                            image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=600'
                        }}
                        onAddToCart={addToCart}
                    />
                    <ProductCard
                        product={{
                            id: 'sp-4',
                            name: 'Silken Tofu',
                            jpCategory: '絹豆腐',
                            price: 3.20,
                            unit: '400g',
                            image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?auto=format&fit=crop&q=80&w=600'
                        }}
                        onAddToCart={addToCart}
                    />
                </div>
            </div>

            {/* Featured Product Large Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className=" bg-emerald-100/50 rounded-[10px] h-[700px] overflow-hidden shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-96 md:h-auto">
                        <img
                            src="https://images.pexels.com/photos/28730007/pexels-photo-28730007.jpeg"
                            alt="Matcha Latte"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
                            <span className="text-[#34D399] font-bold text-sm">Featured Drinks</span>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Japanese Beverages</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                            Discover our signature matcha lattes, cold brew, and seasonal specials. Each drink is crafted with care using premium ingredients from Japan and California.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {/* Card 1: Matcha Specialties */}
                            <div className="bg-[#F0FDF4] p-4 rounded-xl border border-green-50 flex flex-col justify-between h-24">
                                <span className="text-2xl">🍵</span>
                                <span className="text-sm font-bold text-gray-900">Matcha Specialties</span>
                            </div>

                            {/* Card 2: Specialty Coffee */}
                            <div className="bg-[#FFFCF5] p-4 rounded-xl border border-yellow-50 flex flex-col justify-between h-24">
                                <span className="text-2xl">☕</span>
                                <span className="text-sm font-bold text-gray-900">Specialty Coffee</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 font-medium">
                            *Free matcha sample with any grocery purchase over $30
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Grid 2 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="mb-8 flex justify-between items-end">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Weekly Essentials</h2>
                    <Link href="/shop" className="text-primary font-bold text-sm hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {[...additionalProducts, ...featuredProducts].slice(0, 4).map(product => (
                        <ProductCard key={`w-${product.id}`} product={product} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>

            {/* Menu Section */}
            <MenuSection />

            {/* Newsletter */}
            <div className="bg-white border-t border-gray-100 py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Join our community</h2>
                    <p className="text-gray-500 mb-8">Get weekly recipes, sustainable living tips, and exclusive offers.</p>
                    <div className="flex max-w-md mx-auto">
                        <input type="email" placeholder="Your email address" className="flex-1 rounded-l-full border-gray-200 focus:border-primary focus:ring-primary py-3 px-6" />
                        <button className="bg-primary text-white px-8 rounded-r-full font-bold hover:bg-dark transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-serif text-xl font-bold text-gray-900 tracking-tighter">
                            AKHU<span className="text-primary">.</span>
                        </span>
                        <p className="text-xs text-gray-400 mt-1">&copy; 2024 AKHU Grocery & Cafe.</p>
                    </div>
                    <div className="flex space-x-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
