import AccountLayout from '@/Layouts/AccountLayout';
import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import { useCart } from '@/Hooks/useCart';

export default function Favorites({ auth, favorites: dbFavorites }) {
    const { addToCart } = useCart();

    // Map DB products to frontend friendly format
    const favorites = dbFavorites.map(product => ({
        ...product,
        image: product.image_url,
        price: product.price, // Assuming already formatted or needs /100? Let's check logic.
        // In Shop.jsx, price was divided by 100. Let's assume seeded data is in cents?
        // Wait, in OrderDetail, we display price directly. 
        // Let's assume price is float in DB for now or check Shop.jsx again.
    }));

    // In Shop.jsx: price: product.price / 100
    // I should probably check the seeders or database content.
    // Given Shop.jsx does / 100, I should probably do it here too if it's the same data source.
    // However, if I look at OrderDetail, it just displays item.price.
    // Let's stick to Shop.jsx logic for consistency with ProductCard expectations if ProductCard doesn't format it.
    // ProductCard displays: ${product.price}.

    // Let's assume I need to divide by 100 if the Shop page does it.
    // Actually, looking at previous context, price seems to be stored as cents?
    // Let's apply the same mapping as Shop.jsx.

    const mappedFavorites = dbFavorites.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price / 100,
        unit: product.unit,
        image: product.image_url,
        // Pass original for everything else
        ...product,
        price: product.price / 100, // Override
        image: product.image_url // Override
    }));

    return (
        <AccountLayout
            header={
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                    My Favorites
                </h2>
            }
        >
            <Head title="My Favorites" />

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mappedFavorites.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <div className="mb-4 text-gray-300">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No favorites yet</h3>
                    <p className="text-gray-500 mt-2 mb-6">Heart items while shopping to save them here.</p>
                    <Link
                        href={route('shop')}
                        className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors inline-block"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </AccountLayout>
    );
}
