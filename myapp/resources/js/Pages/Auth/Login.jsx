import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), { onFinish: () => reset('password') });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {/* full-page background */}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/images/image.png')", // place your background image in /public/images/
        }}
      >
        {/* overlay for contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

        {/* header text */}
        <div className="relative z-10 mb-10 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-teal-600">
            Welcome to Career-Track
          </h1>
        </div>

        {/* login card */}
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#4B5A6A] p-8 text-white shadow-xl">
          {/* heading inside form */}
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-semibold">
              Sign in to Career-Track
            </h2>
            <p className="text-lg text-gray-200 mt-1">
              New here?{' '}
              <Link
                href={route('register')}
                className="text-white underline hover:text-emerald-200"
              >
                Create an account.
              </Link>
            </p>
          </div>

          <form onSubmit={submit}>
            {status && (
              <div className="mb-4 text-sm font-medium text-green-400">
                {status}
              </div>
            )}

            {/* email */}
            <div>
              <InputLabel htmlFor="email" value="Email" className="text-white" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full rounded-md border-none text-gray-900 p-3"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            {/* password */}
            <div className="mt-4">
              <InputLabel htmlFor="password" value="Password" className="text-white" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full rounded-md border-none text-gray-900 p-3"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            {/* remember + forgot */}
            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className="ms-2 text-sm text-gray-200">Remember me</span>
              </label>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-gray-100 underline hover:text-emerald-200"
                >
                  Forgot password?
                </Link>
              )}
            </div>

            {/* button */}
            <div className="mt-6">
              <PrimaryButton
                className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold"
                disabled={processing}
              >
                Sign In
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}