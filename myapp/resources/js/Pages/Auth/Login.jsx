import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleButton from 'react-google-button';

// Use your resources/image/login-bg.png
const bgUrl = new URL('../../../images/image.png', import.meta.url).href;
const decoUrl = new URL('../../../images/arrow_img.png', import.meta.url).href;

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

      {/* Fullscreen background + centered card */}
      <div className="relative min-h-screen flex items-center justify-center bg-white font-sans overflow-hidden">
        {/* Background image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={bgUrl}
          alt=""
          aria-hidden="true"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-white/40" aria-hidden="true" />

        {/* Decorative image in the corner */}
        <img
          className="hidden md:block absolute right-6 top-6 w-40 h-40 object-contain"
          src={decoUrl}
          alt="Decorative element"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md px-6">
          {/* Header */}
          <h1 className="mb-6 text-center text-3xl md:text-4xl font-bold text-green-800">
            Welcome to Career-Track
          </h1>

          {/* Card */}
          <div className="bg-gray-700/80 rounded-3xl px-8 py-10 shadow-xl backdrop-blur">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-white text-center mb-2">
              Sign in to Career-Track
            </h2>

            {/* New here / register */}
            <p className="text-center text-white mb-6">
              <span>New here? </span>
              <Link
                href={route('register')}
                className="underline font-medium"
              >
                Create an account.
              </Link>
            </p>

            {/* Status flash */}
            {status && (
              <div className="mb-4 text-sm text-teal-200 text-center">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              {/* Email */}
              <div>
                <InputLabel
                  htmlFor="email"
                  value="Email"
                  className="block mb-1 text-white"
                />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  autoComplete="username"
                  isFocused
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full h-12 bg-white rounded-lg text-gray-900 border-none px-3"
                />
                <InputError
                  message={errors.email}
                  className="mt-1 text-sm text-red-200"
                />
              </div>

              {/* Password */}
              <div>
                <InputLabel
                  htmlFor="password"
                  value="Password"
                  className="block mb-1 text-white"
                />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  autoComplete="current-password"
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full h-12 bg-white rounded-lg text-gray-900 border-none px-3"
                />
                <InputError
                  message={errors.password}
                  className="mt-1 text-sm text-red-200"
                />
              </div>
              {/*Google login*/}
                <p className="text-center text-white mb-6">
                  <span>OR</span>
                </p> 
               <a
                  href="/auth/google/redirect"
                  className="block mb-6"
                 >
                  <GoogleButton
                    type="button"
                    onClick={() => {}}
                 />
              </a>


              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm text-white">
                <label className="flex items-center space-x-2">
                  <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                {canResetPassword && (
                  <Link
                    href={route('password.request')}
                    className="underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              {/* Submit */}
              <PrimaryButton
                disabled={processing}
                className="w-full h-12 mt-2 bg-teal-700/80 hover:bg-teal-700 rounded-full text-lg text-white flex items-center justify-center"
              >
                Sign In
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
