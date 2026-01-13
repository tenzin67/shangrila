import React from 'react';
import { usePage, router } from '@inertiajs/react';

export default function ProductCard({ product, onAddToCart }) {
    const { auth } = usePage().props;
    const isFavorited = auth.favorites?.includes(product.id);

    const toggleFavorite = () => {
        if (isFavorited) {
            router.delete(route('favorites.destroy', product.id), {
                preserveScroll: true,
            });
        } else {
            router.post(route('favorites.store'), {
                product_id: product.id
            }, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200/80 hover:shadow-lg transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
            {/* Image Section - Full width with padding if needed or specific look */}
            <div className="">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={product.image || 'https://via.placeholder.com/300?text=Product'}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Favorite Button */}
                    <button
                        onClick={toggleFavorite}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                    >
                        <svg
                            className={`w-5 h-5 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}`}
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-5 pt-3 pb-5 flex-1 flex flex-col">
                <div className="text-[11px] font-bold text-[#00A86B] mb-1.5 tracking-wide">{product.jpCategory || product.category || '商品'}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 leading-snug tracking-tight">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-5 font-medium">{product.unit || '1 unit'}</p>

                <div className="mt-auto flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-xl tracking-tight">${product.price}</span>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-10 h-10 rounded-full bg-[#00C07F] hover:bg-[#00A86B] flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12m6-6H6" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
