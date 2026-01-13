import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const cards = [
        {
            title: 'Your Orders',
            description: 'Track, return, or buy things again',
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            href: route('orders.index'),
        },
        {
            title: 'Login & Security',
            description: 'Edit name, email, and password',
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            href: route('profile.edit'),
        },
        // Placeholder for future features like Addresses, Payments, etc.
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Your Account" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Account</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.href}
                                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex gap-4 items-start"
                            >
                                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors">
                                    {card.icon}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {card.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
