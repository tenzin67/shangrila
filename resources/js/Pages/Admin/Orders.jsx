import React from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import { Head } from '@inertiajs/react';

export default function Orders({ auth }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title="Admin Orders" />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-500 mt-1">Manage customer orders</p>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
                    Order management content will go here.
                </div>
            </div>
        </div>
    );
}
