import React from 'react';

export default function CategoryCard({ name, image, color = 'bg-white' }) {
    return (
        <div className={`relative overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer ${color} h-32 flex items-center`}>
            {/* Text Content */}
            <div className="flex-1 pl-6 z-10">
                 <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight mb-2">{name}</h3>
                 <div className="flex items-center text-xs font-bold text-[#00A86B] group-hover:underline">
                    <span>Shop Now</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </div>
            </div>
            
            {/* Image with Curve */}
          
        </div>
    );
}
