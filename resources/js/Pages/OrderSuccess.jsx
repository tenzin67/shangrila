import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useCart } from '@/Hooks/useCart';

export default function OrderSuccess({ auth, order }) {
    const { clearCart, setIsCartOpen } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
            <Head title="Order Confirmed" />

            <Navbar auth={auth} cartCount={0} onOpenCart={() => setIsCartOpen(true)} />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto mb-4">
                        Thank you for your purchase. We have received your order and will begin processing it shortly.
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                        Order Number: <span className="text-green-600">{order.order_number}</span>
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Order Details</h2>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Contact Information</h3>
                            <p className="text-gray-600">{order.customer_name}</p>
                            <p className="text-gray-600">{order.customer_email}</p>
                            {order.customer_phone && <p className="text-gray-600">{order.customer_phone}</p>}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
                            <p className="text-gray-600">{order.shipping_address.address}</p>
                            <p className="text-gray-600">{order.shipping_address.city}, {order.shipping_address.zip}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
                    <div className="space-y-4 mb-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{item.product_name}</h4>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">${item.subtotal}</p>
                                    <p className="text-sm text-gray-500">${item.price} each</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center text-2xl font-bold">
                            <span>Total</span>
                            <span className="text-green-600">${order.total_amount}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/" className="inline-block bg-[#00A86B] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#008f5b] transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
