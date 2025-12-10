import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Adjust this path to your real logo file
const decoUrl = new URL('../../../images/arrow_img.png', import.meta.url).href;

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen bg-[#E3F6F5] flex flex-col items-center font-sans">
                {/* Top row: logo on the left */}
                <div className="w-full max-w-6xl flex justify-between items-start pt-10 px-10">
                    <img
                        src={decoUrl}
                        alt="Career-Track logo"
                        className="w-28 h-28 rounded-full object-contain"
                    />
                </div>

                {/* Heading + subtitle */}
                <div className="mt-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold text-teal-600">
                        Career-Track
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Start tracking your career journey
                    </p>
                </div>

                {/* Center card */}
                <div className="mt-8 w-full flex justify-center px-4">
                    <div className="w-full max-w-xl bg-white rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.12)] px-10 py-10">
                        {/* Card header */}
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Create Account
                        </h2>
                        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
                            Join thousands of professionals managing their career progress
                        </p>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="w-full h-11 mt-1 bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm px-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-1 text-xs text-red-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full h-11 mt-1 bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm px-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-xs text-red-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full h-11 mt-1 bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm px-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-xs text-red-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full h-11 mt-1 bg-gray-100 rounded-xl border border-gray-200 text-gray-900 text-sm px-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-1 text-xs text-red-500"
                                />
                            </div>

                            {/* Submit button */}
                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white text-sm font-medium rounded-full shadow-md flex items-center justify-center"
                                    disabled={processing}
                                >
                                    Create Account →
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Already have account */}
                        <div className="mt-6 text-center text-sm text-gray-700">
                            <span>Already have an account? </span>
                            <Link
                                href={route('login')}
                                className="text-teal-600 font-medium hover:underline"
                            >
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Terms text */}
                <p className="mt-8 mb-6 text-[11px] text-gray-500 text-center px-4 max-w-xl">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </GuestLayout>
    );
}
