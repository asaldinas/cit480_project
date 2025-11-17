import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Use your resources/image/login-bg.png
const bgUrl = new URL('../../../images/image.png', import.meta.url).href;
const decoUrl = new URL('../../../image/arrow_img.png', import.meta.url).href;

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

      {/* Stage: match Figma canvas size and absolute positions */}
      <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
        <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">

          {/* Background image (Figma: 1536x1024, left -48) */}
          <img
            className="w-[1536px] h-[1024px] left-[-48px] top-0 absolute object-cover"
            src={bgUrl}
            alt=""
            aria-hidden="true"
          />

          {/* Decorative image (leave placeholder or swap your asset) */}
          <img
          className="w-72 h-72 left-[1106.83px] top-[19.23px] absolute object-contain"
          src={decoUrl}
          alt="Decorative element"
          aria-hidden="true"
/>

          {/* Header (outside the form) */}
          <div className="w-[1249.08px] h-24 left-[44px] top-[110.78px] absolute text-center justify-start text-emerald-400 text-7xl font-normal font-['Arimo']">
            Welcome to Career-Track
          </div>

          {/* Card background rectangle */}
          <div className="w-[523px] h-[538px] left-[458px] top-[248px] absolute opacity-80 bg-gray-600/70 rounded-[40px]" />

          {/* Form */}
          <form onSubmit={submit}>
            {/* Title */}
            <div className="left-[538px] top-[285px] absolute text-center justify-start text-white text-3xl font-normal font-['Be_Vietnam_Pro']">
              Sign in to Career-Track
            </div>

            {/* New here? + Create an account */}
            <div className="left-[538px] top-[324px] absolute text-center justify-start">
              <span className="text-white text-2xl font-normal font-['Be_Vietnam_Pro'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                New here?
              </span>
              <span className="text-stone-900 text-2xl font-normal font-['Be_Vietnam_Pro'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                {' '}
              </span>
              <Link
                href={route('register')}
                className="text-white text-2xl font-normal font-['Be_Vietnam_Pro'] underline [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]"
              >
                Create an account.
              </Link>
            </div>

            {/* Status flash (if any) */}
            {status && (
              <div className="left-[495px] top-[360px] absolute text-teal-200 text-base font-medium">
                {status}
              </div>
            )}

            {/* Email label */}
            <InputLabel
              htmlFor="email"
              value="Email"
              className="w-16 h-5 left-[495px] top-[358px] absolute text-center justify-start text-sky-900 text-2xl font-normal font-['Be_Vietnam_Pro']"
            />

            {/* Email input (uses the white rectangle sizing from Figma) */}
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              autoComplete="username"
              isFocused
              onChange={(e) => setData('email', e.target.value)}
              className="w-96 h-14 left-[495px] top-[393px] absolute bg-white rounded-[10px] text-gray-900 p-3 border-none"
            />
            <InputError message={errors.email} className="left-[495px] top-[455px] absolute text-red-100" />

            {/* Password label */}
            <InputLabel
              htmlFor="password"
              value="Password"
              className="w-40 h-7 left-[472px] top-[502px] absolute text-center justify-start text-sky-900 text-2xl font-normal font-['Be_Vietnam_Pro'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]"
            />

            {/* Password input */}
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
              className="w-96 h-14 left-[495px] top-[532px] absolute bg-white rounded-[10px] text-gray-900 p-3 border-none"
            />
            <InputError message={errors.password} className="left-[495px] top-[594px] absolute text-red-100" />

            {/* Forgot password */}
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="w-52 left-[752px] top-[600px] absolute text-center justify-start text-white text-xl font-normal font-['Be_Vietnam_Pro'] underline [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]"
              >
                Forgot Password?
              </Link>
            )}

            {/* Submit button (Figma group) */}
            <PrimaryButton
              disabled={processing}
              className="w-64 h-16 left-[589px] top-[660px] absolute bg-teal-700/50 hover:bg-teal-700 rounded-[40px] text-white text-2xl font-normal font-['Arimo'] flex items-center justify-center"
            >
              Sign In
            </PrimaryButton>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
