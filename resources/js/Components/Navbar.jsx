import { Link, usePage, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Navbar({ auth, cartCount = 0, onOpenCart }) {
    const { url } = usePage();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        router.visit(route('shop'), {
            method: 'get',
            data: { q: searchQuery },
            preserveState: false,
            preserveScroll: true,
        });
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    // Helper to determine link class
    const getLinkClass = (path) => {
        const isActive = path === '/' ? url === '/' : url.startsWith(path);
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
                    <Link href="/" className="group">
                        <span className="font-serif text-2xl font-bold text-gray-900 tracking-tighter group-hover:text-primary transition-colors">
                            Shangrila<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex space-x-10 items-center">
                        <Link href="/" className={getLinkClass('/')}>Home</Link>
                        <Link href="/shop" className={getLinkClass('/shop')}>Shop</Link>
                        <Link href="/cafe" className={getLinkClass('/cafe')}>Cafe</Link>
                        <Link href="/about" className={getLinkClass('/about')}>Our Story</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 ">
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-48 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:border-primary focus:outline-none bg-transparent transition-all"
                                    onBlur={() => {
                                        if (!searchQuery) setIsSearchOpen(false);
                                    }}
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={toggleSearch}
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        )}
                        <div className="w-px h-6 bg-gray-200 mx-2"></div>
                        <button
                            onClick={onOpenCart}
                            className="text-gray-900 hover:text-primary relative group"
                        >
                            <span className="sr-only">Cart</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">{cartCount}</span>
                            )}
                        </button>

                        {auth?.user ? (
                            <div className="relative ml-4">
                                <Link
                                    href={route('profile.edit')}
                                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-secondary/80 transition-colors"
                                >
                                    {auth.user.name.charAt(0)}
                                </Link>
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
