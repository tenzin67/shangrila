import React from 'react';

export default function MenuSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header - Green Background */}
                <div className="bg-[#00C07F] p-8 md:p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-xs font-bold uppercase tracking-wide">Fresh Daily</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-2">Café Menu</h2>
                    <p className="text-green-50 text-lg opacity-90">Handcrafted drinks & homemade pies</p>
                </div>

                <div className="p-8 md:p-10">
                    {/* Coffee & Tea Section */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6v12H6m6-6l6 6m0 0l-6-6m6 6H6" transform="rotate(-45 12 12)" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Coffee & Tea</h3>
                        </div>

                        <div className="space-y-4">
                            {/* Brew Coffee */}
                            <div className="border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:border-gray-200 transition-colors">
                                <span className="font-bold text-gray-800 mb-2 sm:mb-0">Brew Coffee</span>
                                <div className="flex space-x-4">
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Small</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$1.49</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Medium</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$1.99</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Large</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$2.99</span>
                                    </div>
                                </div>
                            </div>

                            {/* Latte */}
                            <div className="border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:border-gray-200 transition-colors">
                                <span className="font-bold text-gray-800 mb-2 sm:mb-0">Latte</span>
                                <div className="flex space-x-4">
                                     <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Small</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$3.50</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Medium</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$4.00</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Large</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$4.50</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mocha */}
                            <div className="border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:border-gray-200 transition-colors">
                                <span className="font-bold text-gray-800 mb-2 sm:mb-0">Mocha</span>
                                <div className="flex space-x-4">
                                     <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Small</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$3.20</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Medium</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$4.20</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500 font-medium mr-2">Large</span>
                                        <span className="text-sm font-bold text-[#00A86B]">$4.99</span>
                                    </div>
                                </div>
                            </div>

                             {/* Tea */}
                             <div className="border border-gray-100 rounded-xl p-5 flex items-center justify-between hover:border-gray-200 transition-colors">
                                <span className="font-bold text-gray-800">Tea</span>
                                <span className="text-lg font-bold text-[#00A86B]">$2.49</span>
                            </div>
                        </div>
                    </div>

                    {/* Homemade Pies Section */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Homemade Pies</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Key Lime */}
                            <div className="border border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow bg-white">
                                <div className="text-4xl mb-4">🥧</div>
                                <h4 className="font-bold text-gray-900 mb-2">Key Lime Pie</h4>
                                <span className="text-pink-500 font-bold text-lg">$6.99</span>
                            </div>

                            {/* Chocolate */}
                            <div className="border border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow bg-white">
                                <div className="text-4xl mb-4">🍫</div>
                                <h4 className="font-bold text-gray-900 mb-2">Chocolate Pie</h4>
                                <span className="text-pink-500 font-bold text-lg">$6.99</span>
                            </div>

                             {/* Coconut */}
                             <div className="border border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow bg-white">
                                <div className="text-4xl mb-4">🥥</div>
                                <h4 className="font-bold text-gray-900 mb-2">Coconut Pie</h4>
                                <span className="text-pink-500 font-bold text-lg">$6.99</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="bg-[#F0FFF4] p-6 text-center border-t border-green-50">
                    <p className="text-gray-700 font-medium">
                        <span className="text-[#00A86B] font-bold">Free matcha sample</span> with any grocery purchase over $30
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Available at our café counter daily</p>
                </div>
            </div>
        </div>
    );
}
