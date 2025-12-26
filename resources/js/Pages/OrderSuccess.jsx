import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useCart } from '@/Hooks/useCart';

export default function OrderSuccess({ auth }) {
    const { clearCart, setIsCartOpen } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Order Confirmed" />

            <Navbar auth={auth} cartCount={0} onOpenCart={() => setIsCartOpen(true)} />

            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto mb-10">
                    Thank you for your purchase. We have received your order and will begin processing it shortly.
                </p>

                <Link href="/" className="inline-block bg-[#00A86B] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#008f5b] transition-colors">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
