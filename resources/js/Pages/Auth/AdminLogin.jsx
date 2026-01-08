import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage, router } from '@inertiajs/react'; // Added router
import { useEffect } from 'react'; // Added useEffect

export default function AdminLogin({ status }) {
    const { auth } = usePage().props; // Get auth from shared props

    useEffect(() => {
        if (auth?.user?.is_admin) {
            router.visit(route('admin.dashboard'), { replace: true });
        }
    }, [auth]);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login.store'), {
            replace: true,
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            <Head title="Admin Login" />

            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                    alt="Market Fresh"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#00C48C]/20 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <h2 className="text-4xl font-serif font-bold mb-4">Admin Portal</h2>
                    <p className="text-lg text-white/90">Manage your market inventory and orders.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-center">
                        <span className="font-serif text-3xl font-bold text-gray-900 tracking-tighter">
                            Shangrila<span className="text-[#00C48C]">.</span>
                        </span>
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Admin Access</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Please sign in to continue
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00C48C] focus:ring focus:ring-[#00C48C]/20 py-3"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00C48C] focus:ring focus:ring-[#00C48C]/20 py-3"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-4 text-base font-bold bg-[#00C48C] hover:bg-[#00B380] text-white rounded-xl shadow-lg transition-all"
                            disabled={processing}
                        >
                            Login to Dashboard
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
