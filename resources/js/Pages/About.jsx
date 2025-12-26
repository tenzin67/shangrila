import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function About({ auth }) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Our Story" />
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8">Our Story</h1>

                    <div className="prose prose-lg mx-auto text-gray-600">
                        <p className="mb-6">
                            Founded with a passion for bridging cultures, <strong>Shangrila</strong> brings the finest Japanese ingredients and California's fresh produce together under one roof.
                        </p>
                        <p className="mb-6">
                            What started as a small neighborhood grocer has grown into a community hub where you can find authentic miso, ceremonial matcha, and locally sourced organic vegetables.
                        </p>
                        <p>
                            We believe in food that nourishes not just the body, but the soul. Welcome to our family.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
