import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import AddProductForm from '@/Components/AddProductForm';
import EditProductForm from '@/Components/EditProductForm';
import { Head, router } from '@inertiajs/react';

export default function Products({ auth, products: initialProducts }) {
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState(initialProducts || []);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Sync products state with props whenever they change
    useEffect(() => {
        if (initialProducts && initialProducts.length >= 0) {
            setProducts(initialProducts);
        }
    }, [initialProducts]);

    // Calculate dynamic stats from real products
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock_quantity || 0), 0);
    const lowStockProducts = products.filter(p => p.stock_quantity <= (p.low_stock_threshold || 20)).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0);

    // Get unique categories
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categories = ['All', ...uniqueCategories];

    // Filter products by category and search
    const displayProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.japanese_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handler functions
    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEditForm(true);
        setShowAddProductForm(false);
    };

    const handleDelete = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${productId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
                }
            });
        }
    };

    const handleStockAdjustment = (productId, adjustment) => {
        setProducts(prevProducts =>
            prevProducts.map(p => {
                if (p.id === productId) {
                    const newQuantity = Math.max(0, p.stock_quantity + adjustment);
                    return { ...p, stock_quantity: newQuantity };
                }
                return p;
            })
        );

        router.post(`/admin/products/${productId}/adjust-stock`, {
            adjustment: adjustment
        }, {
            preserveScroll: true,
            onError: () => {
                router.reload({ preserveScroll: true });
            }
        });
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'vegetables': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'fruits': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'meat': return 'bg-red-50 text-red-600 border-red-100';
            case 'seafood': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'dairy': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'pantry': return 'bg-purple-50 text-purple-600 border-purple-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Head title="Admin Products" />
            <AdminNavbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                        <p className="text-gray-500 mt-1">Manage your inventory and products</p>
                    </div>
                    <button
                        onClick={() => {
                            setShowAddProductForm(!showAddProductForm);
                            setShowEditForm(false);
                        }}
                        className="flex items-center space-x-2 bg-[#00C48C] hover:bg-[#00B380] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>{showAddProductForm ? 'Cancel' : 'Add Product'}</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Products</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</h3>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Stock</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalStock}</h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{lowStockProducts}</h3>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">¥{totalValue.toLocaleString()}</h3>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Forms */}
                {showAddProductForm && (
                    <div className="mb-8">
                        <AddProductForm onClose={() => {
                            setShowAddProductForm(false);
                            router.reload({ preserveScroll: true });
                        }} />
                    </div>
                )}

                {showEditForm && editingProduct && (
                    <div className="mb-8">
                        <EditProductForm
                            product={editingProduct}
                            onClose={() => {
                                setShowEditForm(false);
                                setEditingProduct(null);
                                router.reload({ preserveScroll: true });
                            }}
                        />
                    </div>
                )}

                {/* Category Filter Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeCategory === category
                                        ? 'border-[#00C48C] text-[#00C48C]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                    <span className="ml-2 text-xs text-gray-400">
                                        ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products by name or Japanese name..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00C48C] focus:border-[#00C48C] sm:text-sm shadow-sm transition-shadow"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/3">Product</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {displayProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img className="h-12 w-12 rounded-xl object-cover border border-gray-100" src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">{product.japanese_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getCategoryColor(product.category)}`}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">¥{product.price}</div>
                                            <div className="text-xs text-gray-500">{product.unit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleStockAdjustment(product.id, -1)}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors bg-white"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center text-sm font-semibold text-gray-700 border border-gray-200 py-1.5 rounded-lg bg-white">{product.stock_quantity}</span>
                                                <button
                                                    onClick={() => handleStockAdjustment(product.id, 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors bg-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`w-24 px-3 py-1 inline-flex items-center justify-center text-xs leading-5 font-semibold rounded-full ${product.stock_quantity > (product.low_stock_threshold || 20) ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                                {product.stock_quantity > (product.low_stock_threshold || 20) ? 'In Stock' : 'Low Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {displayProducts.length === 0 && (
                        <div className="text-center py-12 bg-gray-50">
                            <p className="text-gray-500">No products found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
