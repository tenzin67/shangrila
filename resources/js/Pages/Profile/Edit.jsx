import AccountLayout from '@/Layouts/AccountLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AccountLayout
            header={
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Account Settings
                </h2>
            }
        >
            <Head title="Account Settings" />

            <div className="space-y-10">
                {/* Profile Info Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50">
                    <section>
                        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                                <p className="text-sm text-gray-500">Update your account details and email.</p>
                            </div>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>
                </div>

                {/* Password Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50">
                    <section>
                        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Security</h2>
                                <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                            </div>
                        </div>
                        <UpdatePasswordForm className="max-w-xl" />
                    </section>
                </div>

                {/* Delete Account Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
                    <section>
                        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-red-100">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
                                <p className="text-sm text-red-400">Permanently delete your account and data.</p>
                            </div>
                        </div>
                        <DeleteUserForm className="max-w-xl" />
                    </section>
                </div>
            </div>
        </AccountLayout>
    );
}
