import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function InstantSearch({ placeholder = "Search products..." }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            try {
                const response = await axios.get(route('api.products.search'), { params: { q: query } });
                setResults(response.data);
                setIsOpen(true);
            } catch (error) {
                console.error("Search error", error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative w-full max-w-xl" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">Suggestions</h3>
                        {results.map((product) => (
                            <Link
                                key={product.id}
                                href={route('shop', { q: product.name })} // Or link to product detail if we had one
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <span className="font-bold text-xs text-gray-900">${product.price / 100}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
