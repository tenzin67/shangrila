import React, { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import { Head, Link, router } from '@inertiajs/react';

export default function Orders({ auth, orders, filters }) {
    const [statusFilter, setStatusFilter] = useState(filters.status);
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [showBulkCancelModal, setShowBulkCancelModal] = useState(false);
    const [bulkCancelReason, setBulkCancelReason] = useState('');

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        router.get(route('admin.orders'), { status, search: searchTerm }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders'), { status: statusFilter, search: searchTerm }, { preserveState: true });
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map(o => o.id));
        }
    };

    const toggleSelectOrder = (orderId) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        } else {
            setSelectedOrders([...selectedOrders, orderId]);
        }
    };

    const handleBulkConfirm = () => {
        if (selectedOrders.length === 0) return;

        if (confirm(`Confirm ${selectedOrders.length} order(s)?`)) {
            router.post(route('admin.orders.bulk-confirm'), {
                order_ids: selectedOrders,
            }, {
                onSuccess: () => setSelectedOrders([]),
            });
        }
    };

    const handleBulkCancel = (e) => {
        e.preventDefault();

        router.post(route('admin.orders.bulk-cancel'), {
            order_ids: selectedOrders,
            reason: bulkCancelReason,
        }, {
            onSuccess: () => {
                setSelectedOrders([]);
                setShowBulkCancelModal(false);
                setBulkCancelReason('');
            },
        });
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
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title="Admin Orders" />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-500 mt-1">{orders.length} total orders</p>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search by order number, customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                        />
                    </form>
                </div>

                {/* Status Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Bulk Actions */}
                {selectedOrders.length > 0 && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center">
                        <span className="text-blue-900 font-medium">
                            {selectedOrders.length} order(s) selected
                        </span>
                        <div className="flex gap-3">
                            <button
                                onClick={handleBulkConfirm}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                            >
                                Confirm Selected
                            </button>
                            <button
                                onClick={() => setShowBulkCancelModal(true)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                            >
                                Cancel Selected
                            </button>
                            <button
                                onClick={() => setSelectedOrders([])}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Orders Table */}
                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.length === orders.length}
                                                onChange={toggleSelectAll}
                                                className="rounded border-gray-300"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Number
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(order.id)}
                                                    onChange={() => toggleSelectOrder(order.id)}
                                                    className="rounded border-gray-300"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    href={route('admin.orders.show', order.id)}
                                                    className="font-mono text-sm font-bold text-primary hover:underline"
                                                >
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                                                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-gray-900">${order.total_amount}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-lg font-medium">No orders found</p>
                            <p className="text-sm mt-1">Orders will appear here once customers start placing them.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bulk Cancel Modal */}
            {showBulkCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancel Multiple Orders</h2>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-yellow-800 text-sm">
                                <strong>Warning:</strong> You are about to cancel {selectedOrders.length} order(s). This will release all reserved inventory.
                            </p>
                        </div>

                        <form onSubmit={handleBulkCancel}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cancellation Reason <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={bulkCancelReason}
                                    onChange={(e) => setBulkCancelReason(e.target.value)}
                                    required
                                    minLength={10}
                                    maxLength={500}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                                    placeholder="Provide reason for bulk cancellation (minimum 10 characters)"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {bulkCancelReason.length}/500 characters
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowBulkCancelModal(false);
                                        setBulkCancelReason('');
                                    }}
                                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Go Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={bulkCancelReason.length < 10}
                                    className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel {selectedOrders.length} Order(s)
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
