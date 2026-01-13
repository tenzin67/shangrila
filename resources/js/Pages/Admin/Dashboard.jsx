import React, { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, products: initialProducts }) {
    const [products] = useState(initialProducts || []);

    // Calculate dynamic stats from real products
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock_quantity || 0), 0);
    const lowStockProducts = products.filter(p => p.stock_quantity <= (p.low_stock_threshold || 20)).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0);

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title="Admin Dashboard" />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome to your inventory management system</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Card 1: Total Products (Green) */}
                    <div className="bg-[#00C48C] rounded-2xl p-6 text-white relative overflow-hidden h-40">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <div>
                                <h3 className="text-4xl font-bold">{totalProducts}</h3>
                                <p className="text-sm font-medium opacity-90 mt-1">Total Products</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Items in Stock (Blue) */}
                    <div className="bg-[#2563EB] rounded-2xl p-6 text-white relative overflow-hidden h-40">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <div>
                                <h3 className="text-4xl font-bold">{totalStock}</h3>
                                <p className="text-sm font-medium opacity-90 mt-1">Items in Stock</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Low Stock Alerts (Orange) */}
                    <div className="bg-[#F97316] rounded-2xl p-6 text-white relative overflow-hidden h-40">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="text-4xl font-bold">{lowStockProducts}</h3>
                                <p className="text-sm font-medium opacity-90 mt-1">Low Stock Alerts</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Total Inventory Value (Purple) */}
                    <div className="bg-[#A855F7] rounded-2xl p-6 text-white relative overflow-hidden h-40">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <div>
                                <h3 className="text-4xl font-bold">${(totalValue / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                                <p className="text-sm font-medium opacity-90 mt-1">Total Inventory Value</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="/admin/products"
                            className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-[#00C48C] hover:bg-emerald-50/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-[#00C48C] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Manage Products</h4>
                                <p className="text-sm text-gray-500">View all products</p>
                            </div>
                        </a>

                        <a
                            href="/admin/orders"
                            className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Orders</h4>
                                <p className="text-sm text-gray-500">View all orders</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
}
