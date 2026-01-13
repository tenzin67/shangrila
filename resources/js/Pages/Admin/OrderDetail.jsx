import React, { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import { Head, Link, router } from '@inertiajs/react';
import CancelOrderModal from '@/Components/CancelOrderModal';

export default function OrderDetail({ auth, order }) {
    const [showCancelModal, setShowCancelModal] = useState(false);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            processing: 'bg-indigo-100 text-indigo-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleConfirm = () => {
        router.post(route('admin.orders.confirm', order.id));
    };

    const handleProcess = () => {
        router.post(route('admin.orders.process', order.id));
    };

    const handleShip = () => {
        router.post(route('admin.orders.ship', order.id));
    };

    const handleDeliver = () => {
        router.post(route('admin.orders.deliver', order.id));
    };

    const getActionButtons = () => {
        const buttons = [];

        if (order.status === 'pending') {
            buttons.push(
                <button key="confirm" onClick={handleConfirm} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Confirm Order
                </button>
            );
        }

        if (order.status === 'confirmed') {
            buttons.push(
                <button key="process" onClick={handleProcess} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Start Processing
                </button>
            );
        }

        if (order.status === 'processing') {
            buttons.push(
                <button key="ship" onClick={handleShip} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    Mark as Shipped
                </button>
            );
        }

        if (order.status === 'shipped') {
            buttons.push(
                <button key="deliver" onClick={handleDeliver} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                    Mark as Delivered
                </button>
            );
        }

        if (order.status === 'pending' || order.status === 'confirmed') {
            buttons.push(
                <button key="cancel" onClick={() => setShowCancelModal(true)} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                    Cancel Order
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title={`Order ${order.order_number}`} />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-8">
                    <Link href={route('admin.orders')} className="text-primary hover:underline mb-4 inline-block">
                        ← Back to Orders
                    </Link>

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Order {order.order_number}</h1>
                            <p className="text-gray-500 mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                {getActionButtons().length > 0 && (
                    <div className="mb-8 flex gap-3">
                        {getActionButtons()}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-100 last:border-0">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{item.product_name}</h3>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity} × ${item.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">${item.subtotal}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center text-2xl font-bold">
                                    <span>Total</span>
                                    <span className="text-green-600">${order.total_amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold mb-4">Order Timeline</h2>
                            <div className="space-y-4">
                                {order.status_history && order.status_history.map((history, index) => (
                                    <div key={history.id} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                            {index !== order.status_history.length - 1 && (
                                                <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(history.new_status)}`}>
                                                    {history.old_status ? `${history.old_status} → ` : ''}{history.new_status}
                                                </span>
                                                <span className="text-sm text-gray-500">{new Date(history.created_at).toLocaleString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Changed by: {history.changed_by?.name || 'System'}
                                            </p>
                                            {history.notes && (
                                                <p className="text-sm text-gray-500 mt-1 italic">{history.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cancellation Info */}
                        {order.status === 'cancelled' && (
                            <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                                <h3 className="text-lg font-bold text-red-900 mb-2">Cancellation Details</h3>
                                <p className="text-sm text-red-700 mb-1">
                                    <strong>Cancelled by:</strong> {order.cancelled_by?.name || 'Unknown'}
                                </p>
                                <p className="text-sm text-red-700 mb-1">
                                    <strong>Cancelled at:</strong> {new Date(order.cancelled_at).toLocaleString()}
                                </p>
                                <p className="text-sm text-red-700">
                                    <strong>Reason:</strong> {order.cancel_reason}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold mb-4">Customer Information</h2>
                            <div className="space-y-2">
                                <p className="text-gray-900 font-medium">{order.customer_name}</p>
                                <p className="text-gray-600 text-sm">{order.customer_email}</p>
                                {order.customer_phone && (
                                    <p className="text-gray-600 text-sm">{order.customer_phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                            <div className="text-gray-600 text-sm space-y-1">
                                <p>{order.shipping_address.address}</p>
                                <p>{order.shipping_address.city}, {order.shipping_address.zip}</p>
                            </div>
                        </div>

                        {/* Delivery Schedule */}
                        {order.delivery_date && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold mb-4">Delivery Schedule</h2>
                                <div className="text-gray-600 text-sm space-y-1">
                                    <p className="font-bold text-gray-900">{new Date(order.delivery_date).toLocaleDateString()}</p>
                                    <p>{order.delivery_time_slot}</p>
                                </div>
                            </div>
                        )}

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold mb-4">Payment</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Method:</span>
                                    <span className="font-medium capitalize">{order.payment_method || 'Not specified'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium capitalize ${order.payment_status === 'paid' ? 'text-green-600' :
                                        order.payment_status === 'refunded' ? 'text-blue-600' :
                                            order.payment_status === 'failed' ? 'text-red-600' :
                                                'text-yellow-600'
                                        }`}>
                                        {order.payment_status || 'Pending'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <CancelOrderModal
                    order={order}
                    onClose={() => setShowCancelModal(false)}
                />
            )}
        </div>
    );
}
