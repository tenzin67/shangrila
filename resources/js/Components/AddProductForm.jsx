import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AddProductForm({ onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: '',
        unit: '',
        category: '',
        stock_quantity: '',
        low_stock_threshold: 20,
        image_url: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="e.g., Premium Rice"
                            className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>



                    {/* Price */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Price ($) *
                        </label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            placeholder="e.g., 12.00"
                            className={`w-full rounded-xl border ${errors.price ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                        />
                        {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                    </div>

                    {/* Unit */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Unit *
                        </label>
                        <input
                            type="text"
                            value={data.unit}
                            onChange={e => setData('unit', e.target.value)}
                            placeholder="e.g., 1kg, 500g, 100ml"
                            className={`w-full rounded-xl border ${errors.unit ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                        />
                        {errors.unit && <div className="text-red-500 text-xs mt-1">{errors.unit}</div>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Category *
                        </label>
                        <div className="relative">
                            <select
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className={`w-full appearance-none rounded-xl border ${errors.category ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3 text-gray-900 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                            >
                                <option value="">Select category</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="fruits">Fruits</option>
                                <option value="meat">Meat</option>
                                <option value="seafood">Seafood</option>
                                <option value="dairy">Dairy</option>
                                <option value="pantry">Pantry</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Stock Quantity *
                        </label>
                        <input
                            type="number"
                            value={data.stock_quantity}
                            onChange={e => setData('stock_quantity', e.target.value)}
                            placeholder="e.g., 50"
                            className={`w-full rounded-xl border ${errors.stock_quantity ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                        />
                        {errors.stock_quantity && <div className="text-red-500 text-xs mt-1">{errors.stock_quantity}</div>}
                    </div>
                </div>

                {/* Low Stock Threshold (Full Width) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Low Stock Threshold
                    </label>
                    <input
                        type="number"
                        value={data.low_stock_threshold}
                        onChange={e => setData('low_stock_threshold', e.target.value)}
                        className={`w-full md:w-1/2 rounded-xl border ${errors.low_stock_threshold ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                    />
                    {errors.low_stock_threshold && <div className="text-red-500 text-xs mt-1">{errors.low_stock_threshold}</div>}
                </div>

                {/* Image URL (Full Width) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Image URL *
                    </label>
                    <input
                        type="text"
                        value={data.image_url}
                        onChange={e => setData('image_url', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className={`w-full rounded-xl border ${errors.image_url ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] outline-none transition-all`}
                    />
                    {errors.image_url && <div className="text-red-500 text-xs mt-1">{errors.image_url}</div>}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center space-x-2 rounded-full bg-[#00C48C] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#00B380] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00C48C] focus:ring-offset-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>{processing ? 'Adding...' : 'Add Product'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
