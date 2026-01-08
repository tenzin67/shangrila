import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProfileModal from './ProfileModal';

export default function AdminNavbar({ auth }) {
    const { url } = usePage();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Helper to determine link class
    const getLinkClass = (path) => {
        // Strict check to handle exact matches correctly
        const isActive = path === '/admin' ? url === '/admin' : url.startsWith(path);
        const baseClass = "transition-colors font-medium border-b-2 pb-1";
        const activeClass = "text-gray-900 border-primary";
        const inactiveClass = "text-gray-500 hover:text-primary border-transparent hover:border-primary";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/admin" className="group">
                        <span className="font-serif text-2xl font-bold text-gray-900 tracking-tighter group-hover:text-primary transition-colors">
                            Shangrila<span className="text-primary">.</span> <span className="text-sm font-sans font-medium text-gray-400 ml-2">Admin</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <Link href="/admin" className={getLinkClass('/admin')}>Dashboard</Link>
                        <Link href="/admin/products" className={getLinkClass('/admin/products')}>Products</Link>
                        <Link href="/admin/orders" className={getLinkClass('/admin/orders')}>Orders</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 ">
                        <div className="w-px h-6 bg-gray-200 mx-2"></div>

                        {auth?.user ? (
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    {auth.user.name.charAt(0)}
                                </button>

                                {isProfileOpen && (
                                    <ProfileModal
                                        user={auth.user}
                                        onClose={() => setIsProfileOpen(false)}
                                    />
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="ml-4 text-sm font-bold text-gray-900 hover:text-primary">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
