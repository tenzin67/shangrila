import AccountLayout from '@/Layouts/AccountLayout';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/Hooks/useCart';

export default function OrderDetail({ auth, order }) {
    const { addItemsToCart, setIsCartOpen } = useCart();

    const handleReorder = () => {
        const itemsToReorder = order.items.map(item => ({
            id: item.product_id,
            name: item.product_name,
            image: item.product_image,
            price: parseFloat(item.price),
            quantity: item.quantity
        }));
        addItemsToCart(itemsToReorder);
        setIsCartOpen(true);
    };

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

    const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentStepIndex = steps.indexOf(order.status);
    const isCancelled = order.status === 'cancelled';

    return (
        <AccountLayout>
            <Head title={`Order ${order.order_number}`} />

            <div className="space-y-6">
                {/* Breadcrumb & Header */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link href={route('orders.index')} className="hover:text-primary transition-colors">
                            &larr; Back to Orders
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900">Order #{order.order_number}</h1>
                            <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleReorder}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Order Again
                            </button>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                {!isCancelled && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                        <div className="flex items-start justify-between min-w-[600px] relative">
                            {/* Line */}
                            <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-100 -z-0 transform -translate-y-1/2"></div>
                            <div
                                className="absolute top-3 left-0 h-0.5 bg-emerald-500 -z-0 transition-all duration-500 transform -translate-y-1/2"
                                style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;

                                return (
                                    <div key={step} className="relative z-10 flex flex-col items-center">
                                        <div className="h-6 flex items-center justify-center mb-2">
                                            <div
                                                className={`rounded-full transition-all duration-300 flex items-center justify-center
                                                    ${isCurrent
                                                        ? 'w-6 h-6 bg-black ring-4 ring-black/10'
                                                        : isCompleted
                                                            ? 'w-4 h-4 bg-black scale-100'
                                                            : 'w-3 h-3 bg-gray-200'
                                                    }`}
                                            >
                                            </div>
                                        </div>
                                        <p className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isCurrent ? 'text-black' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                                            }`}>
                                            {step}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {isCancelled && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </div>
                            <div>
                                <h3 className="text-red-900 font-bold text-lg mb-1">Order Cancelled</h3>
                                <p className="text-red-700 text-sm">This order was cancelled on {new Date(order.cancelled_at).toLocaleDateString()}.</p>
                                {order.cancel_reason && (
                                    <p className="text-red-700 mt-2 text-sm"><strong>Reason:</strong> {order.cancel_reason}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                        {/* Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-900">Items Ordered</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-6 flex gap-6">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-base mb-1">{item.product_name}</h3>
                                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                            <p className="text-primary font-bold mt-2">${item.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-gray-900">${item.subtotal}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 pb-4 border-b border-gray-100 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${order.total_amount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-between items-baseline font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-2xl">${order.total_amount}</span>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Shipping Details
                            </h2>
                            <address className="not-italic text-sm text-gray-600 space-y-2">
                                <p className="font-bold text-gray-900">{order.customer_name}</p>
                                <p>{order.shipping_address.address}</p>
                                <p>{order.shipping_address.city}, {order.shipping_address.zip}</p>
                                <div className="pt-2 border-t border-gray-100 mt-2">
                                    <p className="text-gray-500">{order.customer_phone}</p>
                                </div>
                            </address>
                        </div>

                        {/* Delivery Schedule */}
                        {order.delivery_date && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Delivery Schedule
                                </h2>
                                <div className="text-sm">
                                    <p className="font-bold text-gray-900">{new Date(order.delivery_date).toLocaleDateString()}</p>
                                    <p className="text-gray-600">{order.delivery_time_slot}</p>
                                </div>
                            </div>
                        )}

                        {/* Payment Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                Payment Info
                            </h2>
                            <div className="text-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Method</span>
                                    <span className="font-medium text-gray-900 capitalize">{order.payment_method || 'Standard'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold capitalize ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.payment_status || 'Pending'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
