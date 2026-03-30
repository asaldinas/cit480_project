import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
  return (
    <AuthenticatedLayout>
      <Head title="Privacy & Security" />

      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-teal-500">🛡️</span>
          Privacy & Security
        </h1>
        <p className="text-gray-500">
          Manage your privacy settings and control how your data is used
        </p>

        {/* Privacy Controls */}
        <div className="bg-white rounded-lg border p-5 space-y-4">
          <h2 className="font-semibold">Privacy Controls</h2>

          {[
            ['Data Collection', 'Allow CareerTrack to collect usage data'],
            ['Analytics', 'Share anonymous analytics data'],
            ['Marketing Communications', 'Receive emails about new features'],
            ['Third-Party Sharing', 'Share anonymized data'],
            ['Activity Tracking', 'Track application activity'],
            ['Email Notifications', 'Receive email updates'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex justify-between items-center border-t pt-4 first:border-0 first:pt-0">
              <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-500">{desc}</div>
              </div>
              <input type="checkbox" className="h-5 w-5 accent-black" />
            </div>
          ))}
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-lg border p-5 space-y-3">
          <h2 className="font-semibold">Data Security</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✔ End-to-End Encryption</li>
            <li>✔ Secure Authentication</li>
            <li>✔ Regular Security Audits</li>
            <li>✔ GDPR Compliant</li>
          </ul>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg border p-5 space-y-4">
          <h2 className="font-semibold">Data Management</h2>

          <div className="flex justify-between items-center">
            <span>Download Your Data</span>
            <button className="px-4 py-2 border rounded text-teal-600">
              Export Data
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span>Delete Your Account</span>
            <button className="px-4 py-2 border rounded text-red-600">
              Delete Account
            </button>
          </div>
{/* Privacy Policy */}
<div className="bg-white rounded-lg border p-5 space-y-4">
  <div className="flex items-center gap-2">
    <span className="text-teal-500 text-lg">🔔</span>
    <div>
      <h2 className="font-semibold">Privacy Policy</h2>
      <p className="text-sm text-gray-500">
        Last updated: October 25, 2025
      </p>
    </div>
  </div>

  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
    <div>
      <h3 className="font-medium text-gray-900">What Information We Collect</h3>
      <p>
        We collect information you provide directly to us, such as when you
        create an account, add job applications, or contact our support team.
        This includes your name, email address, job application details, and any
        documents you upload.
      </p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">How We Use Your Information</h3>
      <p>
        We use the information we collect to provide, maintain, and improve our
        services, to communicate with you, to monitor and analyze trends and
        usage, and to personalize your experience with CareerTrack.
      </p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Information Sharing</h3>
      <p>
        We do not sell your personal information. We may share your information
        with service providers who assist us in operating our platform, only to
        the extent necessary to provide those services.
      </p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Your Rights</h3>
      <p>
        You have the right to access, correct, or delete your personal
        information. You can also object to or restrict certain processing of
        your data. To exercise these rights, use the data management tools above
        or contact our support team.
      </p>
    </div>

    <div>
      <h3 className="font-medium text-gray-900">Data Retention</h3>
      <p>
        We retain your information for as long as your account is active or as
        needed to provide you services. You can request deletion of your data at
        any time.
      </p>
    </div>

    <button className="mt-2 inline-block px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700">
      View Full Privacy Policy
    </button>
  </div>
</div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
