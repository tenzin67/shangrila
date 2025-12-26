import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useCart } from '@/Hooks/useCart';

export default function Checkout({ auth }) {
    const { cart, cartTotal, setIsCartOpen, cartCount } = useCart();

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally submit to backend
        // For now, redirect to success page
        window.location.href = '/order-success';
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
                    <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <Head title="Checkout" />

            <Navbar auth={auth} cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Contact Info */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            required name="firstName" value={formData.firstName} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            required name="lastName" value={formData.lastName} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            required type="email" name="email" value={formData.email} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            required name="address" value={formData.address} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input
                                                required name="city" value={formData.city} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
                                            <input
                                                required name="zip" value={formData.zip} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                        <input
                                            required placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                            <input
                                                required placeholder="MM/YY" name="expDate" value={formData.expDate} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                            <input
                                                required placeholder="123" name="cvv" value={formData.cvv} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors">
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
