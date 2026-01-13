import AccountLayout from '@/Layouts/AccountLayout';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/Hooks/useCart';

export default function Orders({ auth, orders }) {
    const { addItemsToCart, setIsCartOpen } = useCart();

    const handleReorder = (order) => {
        // Map order items to cart item format
        const itemsToReorder = order.items.map(item => ({
            id: item.product_id,
            name: item.product_name,
            image: item.product_image,
            price: parseFloat(item.price), // Ensure number
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

    return (
        <AccountLayout
            header={
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Your Orders
                </h2>
            }
        >
            <Head title="Your Orders" />

            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                                <div className="flex gap-8 text-sm">
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-1">Order Placed</p>
                                        <p className="text-gray-900 font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-1">Total</p>
                                        <p className="text-gray-900 font-medium">${order.total_amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-1">Order #</p>
                                        <p className="text-gray-900 font-medium">{order.order_number}</p>
                                    </div>
                                </div>
                                <Link
                                    href={route('orders.show', order.id)}
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    View Order Details
                                </Link>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            {order.items && order.items.length > 0 && (
                                                <button
                                                    onClick={() => handleReorder(order)}
                                                    className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                    Buy Again
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {order.status === 'delivered' ? 'Delivered successfully' :
                                                order.status === 'cancelled' ? 'This order was cancelled' :
                                                    'Arriving soon'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="mb-4">
                            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                        <p className="text-gray-500 mt-2 mb-6">You haven't placed any orders yet.</p>
                        <Link
                            href={route('shop')}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors inline-block"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}
