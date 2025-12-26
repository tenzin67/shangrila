import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200/80 hover:shadow-lg transition-all duration-300 group flex flex-col h-full overflow-hidden">
            {/* Image Section - Full width with padding if needed or specific look */}
            <div className="">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={product.image || 'https://via.placeholder.com/300?text=Product'}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
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
