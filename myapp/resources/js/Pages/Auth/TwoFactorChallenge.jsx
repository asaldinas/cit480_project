import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

// Use your existing images
const bgUrl = new URL('../../../images/image.png', import.meta.url).href;
const decoUrl = new URL('../../../images/arrow_img.png', import.meta.url).href;

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('two-factor.login'), {
            onFinish: () => reset('code', 'recovery_code'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Two-Factor Challenge" />

            <div className="relative min-h-screen flex items-center justify-center bg-white font-sans overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={bgUrl}
                    alt=""
                    aria-hidden="true"
                />

                <div className="absolute inset-0 bg-white/40" aria-hidden="true" />

                <img
                    className="hidden md:block absolute right-6 top-6 w-40 h-40 object-contain"
                    src={decoUrl}
                    alt="Decorative element"
                    aria-hidden="true"
                />

                <div className="relative z-10 w-full max-w-md px-6">
                    <h1 className="mb-6 text-center text-3xl md:text-4xl font-bold text-green-800">
                        Career-Track Security Check
                    </h1>

                    <div className="bg-gray-700/80 rounded-3xl px-8 py-10 shadow-xl backdrop-blur">
                        <h2 className="text-2xl font-semibold text-white text-center mb-2">
                            Two-Factor Authentication
                        </h2>

                        <p className="text-center text-white mb-6">
                            {!recovery
                                ? 'Enter the authentication code from your authenticator app.'
                                : 'Enter one of your recovery codes.'}
                        </p>

                        <form onSubmit={submit} className="space-y-6">
                            {!recovery ? (
                                <div>
                                    <InputLabel
                                        htmlFor="code"
                                        value="Authentication Code"
                                        className="block mb-1 text-white"
                                    />
                                    <TextInput
                                        id="code"
                                        type="text"
                                        name="code"
                                        value={data.code}
                                        autoComplete="one-time-code"
                                        isFocused
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="w-full h-12 bg-white rounded-lg text-gray-900 border-none px-3"
                                    />
                                    <InputError
                                        message={errors.code}
                                        className="mt-1 text-sm text-red-200"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <InputLabel
                                        htmlFor="recovery_code"
                                        value="Recovery Code"
                                        className="block mb-1 text-white"
                                    />
                                    <TextInput
                                        id="recovery_code"
                                        type="text"
                                        name="recovery_code"
                                        value={data.recovery_code}
                                        autoComplete="one-time-code"
                                        isFocused
                                        onChange={(e) =>
                                            setData('recovery_code', e.target.value)
                                        }
                                        className="w-full h-12 bg-white rounded-lg text-gray-900 border-none px-3"
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                        className="mt-1 text-sm text-red-200"
                                    />
                                </div>
                            )}

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRecovery((previous) => !previous);
                                        reset('code', 'recovery_code');
                                    }}
                                    className="text-sm text-white underline"
                                >
                                    {!recovery
                                        ? 'Use a recovery code instead'
                                        : 'Use an authentication code instead'}
                                </button>
                            </div>

                            <PrimaryButton
                                disabled={processing}
                                className="w-full h-12 mt-2 bg-teal-700/80 hover:bg-teal-700 rounded-full text-lg text-white flex items-center justify-center"
                            >
                                Verify
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}