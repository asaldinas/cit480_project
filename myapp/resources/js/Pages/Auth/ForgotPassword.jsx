import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Adjust this to your real logo path
const logoUrl = new URL('../../../images/arrow_img.png', import.meta.url).href;

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="min-h-screen bg-[#E3F6F5] flex flex-col items-center font-sans">
                {/* Logo */}
                <div className="mt-10">
                    <img
                        src={logoUrl}
                        alt="Career-Track logo"
                        className="w-32 h-32 rounded-full object-contain"
                    />
                </div>

                {/* Card */}
                <div className="mt-8 w-full flex justify-center px-4">
                    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.12)] px-10 py-10">
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Forgot Password?
                        </h2>
                        <p className="mt-3 text-center text-sm text-gray-500">
                            No worries! Enter your email address and we&apos;ll send you
                            instructions to reset your password.
                        </p>

                        {/* Status */}
                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full h-11 mt-1 bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm px-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    placeholder="Enter your email address"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-xs text-red-500"
                                />
                            </div>

                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-full shadow-md flex items-center justify-center"
                                    disabled={processing}
                                >
                                    Send Recovery Email ✈️
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Back / create account */}
                        <div className="mt-6 text-center text-sm text-gray-700">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span>←</span>
                                <Link
                                    href={route('login')}
                                    className="hover:underline"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                            <p className="text-xs text-gray-600">
                                Don&apos;t have an account?
                                <Link
                                    href={route('register')}
                                    className="ml-1 text-teal-600 font-medium hover:underline"
                                >
                                    Create one here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom helper text */}
                <p className="mt-10 mb-6 text-[11px] text-gray-500 text-center px-4">
                    Need help? Contact our support team for assistance
                </p>
            </div>
        </GuestLayout>
    );
}
