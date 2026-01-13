import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useCart } from '@/Hooks/useCart';

export default function Checkout({ auth, addresses = [] }) {
    const { cart, cartTotal, setIsCartOpen, cartCount } = useCart();

    // Find default address to prefill
    const defaultAddress = addresses.find(a => a.is_default) || addresses[0];

    const { data, setData, post, processing, errors } = useForm({
        customer_name: auth.user?.name || '',
        customer_email: auth.user?.email || '',
        customer_phone: auth.user?.phone || '',
        address: defaultAddress?.address || '',
        city: defaultAddress?.city || '',
        zip: defaultAddress?.zip || '',
        cart: cart,
        total: cartTotal,
        delivery_date: '',
        delivery_time_slot: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleAddressSelect = (addressId) => {
        const address = addresses.find(a => a.id === parseInt(addressId));
        if (address) {
            setData((data) => ({
                ...data,
                address: address.address,
                city: address.city,
                zip: address.zip
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Cart clearing is handled by the success page or manual clear if needed
                // But for now, we rely on the redirect
            },
        });
    };

    // Sync form data with cart when it loads
    React.useEffect(() => {
        setData(data => ({
            ...data,
            cart: cart,
            total: cartTotal
        }));
    }, [cart, cartTotal]);

    // ... existing empty cart check ...

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <Head title="Checkout" />

            <Navbar auth={auth} cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        {errors.error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                                {errors.error}
                            </div>
                        )}
                        {errors.cart && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                                Your cart is empty or invalid. Please add items to your cart.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Contact Info */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* ... existing contact inputs ... */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            required name="customer_name" value={data.customer_name} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.customer_name && <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            required type="email" name="customer_email" value={data.customer_email} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.customer_email && <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            name="customer_phone" value={data.customer_phone} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.customer_phone && <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Shipping Address</h2>
                                    {addresses.length > 0 && (
                                        <select
                                            onChange={(e) => handleAddressSelect(e.target.value)}
                                            className="text-sm border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select saved address...</option>
                                            {addresses.map(addr => (
                                                <option key={addr.id} value={addr.id}>
                                                    {addr.label ? `${addr.label} - ` : ''}{addr.address}, {addr.city}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            required name="address" value={data.address} onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input
                                                required name="city" value={data.city} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
                                            <input
                                                required name="zip" value={data.zip} onChange={handleChange}
                                                className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                            {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Schedule */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Delivery Schedule</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                                        <input
                                            required
                                            type="date"
                                            name="delivery_date"
                                            value={data.delivery_date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.delivery_date && <p className="text-red-500 text-sm mt-1">{errors.delivery_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slot</label>
                                        <select
                                            required
                                            name="delivery_time_slot"
                                            value={data.delivery_time_slot}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                        >
                                            <option value="">Select a time slot...</option>
                                            <option value="09:00 - 12:00">Morning (09:00 - 12:00)</option>
                                            <option value="12:00 - 15:00">Afternoon (12:00 - 15:00)</option>
                                            <option value="15:00 - 18:00">Late Afternoon (15:00 - 18:00)</option>
                                            <option value="18:00 - 21:00">Evening (18:00 - 21:00)</option>
                                        </select>
                                        {errors.delivery_time_slot && <p className="text-red-500 text-sm mt-1">{errors.delivery_time_slot}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                                    <p className="font-bold mb-1">Payment Gateway Required</p>
                                    <p>
                                        To ensure top security, please integrate a secure payment gateway like Stripe or PayPal.
                                        Do not enter real credit card information here.
                                    </p>
                                </div>
                                <div className="mt-6 p-6 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
                                    Secure Payment Form Placeholder
                                </div>
                            </div>

                            <button type="submit" disabled={processing} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {processing ? 'Processing...' : 'Place Order'}
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
