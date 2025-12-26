import { Link } from '@inertiajs/react';
import React from 'react';

export default function ProfileModal({ user, onClose }) {
    if (!user) return null;

    return (
        <>
            {/* Backdrop for closing */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                   
                </div>

                <div className="p-2">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center"
                        onClick={onClose}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                    </Link>
                </div>
            </div>
        </>
    );
}
