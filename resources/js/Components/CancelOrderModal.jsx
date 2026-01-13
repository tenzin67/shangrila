import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CancelOrderModal({ order, onClose }) {
    const [reason, setReason] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('admin.orders.cancel', order.id), {
            reason: reason,
        }, {
            onFinish: () => {
                setProcessing(false);
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancel Order</h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                        <strong>Warning:</strong> Cancelling this order will release all reserved inventory.
                        {order.payment_status === 'paid' && ' A refund may need to be processed separately.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cancellation Reason <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            minLength={10}
                            maxLength={500}
                            rows={4}
                            className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="Please provide a detailed reason for cancellation (minimum 10 characters)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {reason.length}/500 characters {reason.length < 10 && `(${10 - reason.length} more required)`}
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            Go Back
                        </button>
                        <button
                            type="submit"
                            disabled={processing || reason.length < 10}
                            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Cancelling...' : 'Cancel Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
