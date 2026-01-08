import React from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import { Head } from '@inertiajs/react';

export default function Categories({ auth }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title="Admin Categories" />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                        <p className="text-gray-500 mt-1">Manage product categories</p>
                    </div>
                    <button className="flex items-center space-x-2 bg-[#00C48C] hover:bg-[#00B380] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Add Category</span>
                    </button>
                </div>

                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
                    Category management content will go here.
                </div>
            </div>
        </div>
    );
}
