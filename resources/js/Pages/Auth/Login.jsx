import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Login({ status, canResetPassword }) {
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
    const [otpSent, setOtpSent] = useState(false);

    // Email Login Form
    const emailForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Phone Login Form
    const phoneForm = useForm({
        phone: '',
        otp: '',
    });

    const submitEmail = (e) => {
        e.preventDefault();
        emailForm.post(route('login'), {
            onFinish: () => emailForm.reset('password'),
        });
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        phoneForm.clearErrors();

        try {
            // Using axios for simple API call to request OTP so we don't reload page
            const response = await axios.post(route('otp.send'), { phone: phoneForm.data.phone });
            if (response.status === 200) {
                setOtpSent(true);
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                phoneForm.setError(error.response.data.errors);
            } else {
                phoneForm.setError('phone', 'Failed to send OTP. Please try again.');
            }
        }
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        phoneForm.post(route('otp.verify'), {
            preserveScroll: true,
            onError: () => {
                // specific error handling if needed
            }
        });
    };

    return (
        <div className="min-h-screen flex bg-white">
            <Head title="Log in" />

            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000"
                    alt="Cafe Interior"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <h2 className="text-4xl font-serif font-bold mb-4">Welcome Back</h2>
                    <p className="text-lg text-white/90">Experience the best of Japanese tradition and California vibes.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-serif text-3xl font-bold text-gray-900 tracking-tighter">
                                Shangrila<span className="text-[#00A86B]">.</span>
                            </span>
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-gray-600">
                            Or <Link href={route('register')} className="font-medium text-[#00A86B] hover:text-[#008f5b] transition-colors">create a new account</Link>
                        </p>
                    </div>

                    {/* Login Method Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`pb-3 px-4 font-medium text-sm transition-colors ${loginMethod === 'email' ? 'border-b-2 border-[#00A86B] text-[#00A86B]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setLoginMethod('email')}
                        >
                            Email & Password
                        </button>
                        <button
                            className={`pb-3 px-4 font-medium text-sm transition-colors ${loginMethod === 'phone' ? 'border-b-2 border-[#00A86B] text-[#00A86B]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setLoginMethod('phone')}
                        >
                            Phone Number
                        </button>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                            {status}
                        </div>
                    )}

                    {loginMethod === 'email' ? (
                        <form onSubmit={submitEmail} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email address" className="text-gray-700 font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={emailForm.data.email}
                                    className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00A86B] focus:ring focus:ring-[#00A86B]/20 py-3"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => emailForm.setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                />
                                <InputError message={emailForm.errors.email} className="mt-2" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-[#00A86B] hover:text-[#008f5b] transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={emailForm.data.password}
                                    className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00A86B] focus:ring focus:ring-[#00A86B]/20 py-3"
                                    autoComplete="current-password"
                                    onChange={(e) => emailForm.setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <InputError message={emailForm.errors.password} className="mt-2" />
                            </div>

                            <div className="block">
                                <label className="flex items-center cursor-pointer">
                                    <Checkbox
                                        name="remember"
                                        checked={emailForm.data.remember}
                                        onChange={(e) => emailForm.setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#00A86B] focus:ring-[#00A86B]/20"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me for 30 days</span>
                                </label>
                            </div>

                            <PrimaryButton
                                className="w-full justify-center py-4 text-base font-bold bg-[#1A1A1A] hover:bg-black text-white rounded-xl shadow-lg transition-all"
                                disabled={emailForm.processing}
                            >
                                Log in
                            </PrimaryButton>
                        </form>
                    ) : (
                        <form onSubmit={otpSent ? verifyOtp : sendOtp} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number" className="text-gray-700 font-medium" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={phoneForm.data.phone}
                                    className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00A86B] focus:ring focus:ring-[#00A86B]/20 py-3"
                                    autoComplete="tel"
                                    isFocused={true}
                                    onChange={(e) => phoneForm.setData('phone', e.target.value)}
                                    placeholder="0912345678"
                                    disabled={otpSent}
                                />
                                <InputError message={phoneForm.errors.phone} className="mt-2" />
                            </div>

                            {otpSent && (
                                <div>
                                    <InputLabel htmlFor="otp" value="Verification Code" className="text-gray-700 font-medium" />
                                    <TextInput
                                        id="otp"
                                        type="text"
                                        name="otp"
                                        value={phoneForm.data.otp}
                                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#00A86B] focus:ring focus:ring-[#00A86B]/20 py-3 tracking-widest text-center text-lg"
                                        onChange={(e) => phoneForm.setData('otp', e.target.value)}
                                        placeholder="123456"
                                        maxLength="6"
                                    />
                                    <div className="mt-2 flex justify-between text-sm">
                                        <InputError message={phoneForm.errors.otp} />
                                        <button
                                            type="button"
                                            onClick={() => setOtpSent(false)}
                                            className="text-[#00A86B] hover:underline ml-auto"
                                        >
                                            Change Phone Number
                                        </button>
                                    </div>
                                </div>
                            )}

                            <PrimaryButton
                                className="w-full justify-center py-4 text-base font-bold bg-[#1A1A1A] hover:bg-black text-white rounded-xl shadow-lg transition-all"
                                disabled={phoneForm.processing}
                            >
                                {otpSent ? 'Verify & Login' : 'Send Verification Code'}
                            </PrimaryButton>
                        </form>
                    )}

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <a
                        href={route('auth.google')}
                        className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-all"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Google</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
