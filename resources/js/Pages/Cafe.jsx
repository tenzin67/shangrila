import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Cafe({ auth }) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Cafe" />
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-emerald-50 rounded-3xl p-16">
                    <span className="text-6xl mb-6 block">☕</span>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">The Café</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our full café menu and online ordering is coming soon.
                        <br />
                        Visit us in store for fresh pastries and artisan coffee.
                    </p>
                </div>
            </div>
        </div>
    );
}
