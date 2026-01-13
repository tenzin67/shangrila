import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import CartSidebar from '@/Components/CartSidebar';
import { useCart } from '@/Hooks/useCart';

export default function AccountLayout({ children, header }) {
    const { url, props } = usePage();
    const { auth } = props;

    const {
        cart,
        isCartOpen,
        setIsCartOpen, // Add this to hook
        updateQuantity,
        removeFromCart,
        cartCount
    } = useCart();

    // Manual state for cart open since useCart might not expose set directly depending on implementation, 
    // but usually it exposes isOpen and setIsOpen or toggle. 
    // Checking Home.jsx: 
    // const { cart, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart, cartCount } = useCart();
    // It exposes setIsCartOpen.

    const navigation = [
        { name: 'Account Settings', href: route('profile.edit'), active: route().current('profile.edit') },
        { name: 'Your Favorites', href: route('favorites.index'), active: route().current('favorites.*') },
        { name: 'Your Orders', href: route('orders.index'), active: route().current('orders.*') },
        { name: 'Address Book', href: route('addresses.index'), active: route().current('addresses.*') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar
                auth={auth}
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
            />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />

            {header && (
                <div className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            <main className="flex-grow py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                    <h2 className="font-bold text-gray-900">My Account</h2>
                                </div>
                                <ul className="divide-y divide-gray-100">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${item.active
                                                    ? 'text-primary border-l-4 border-primary bg-primary/5'
                                                    : 'text-gray-700 hover:text-gray-900 border-l-4 border-transparent'
                                                    }`}
                                            >
                                                {item.name}
                                                {item.active && (
                                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border-l-4 border-transparent text-left"
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                    &copy; 2024 Shangrila Grocery & Cafe.
                </div>
            </footer>
        </div>
    );
}
