import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Collection</h2>
              <p className="text-gray-600 mb-4">
                We collect information necessary for providing healthcare services and managing patient care:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Patient personal information</li>
                <li>Medical history and records</li>
                <li>Treatment information</li>
                <li>Healthcare provider credentials</li>
                <li>System usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Usage</h2>
              <p className="text-gray-600 mb-4">
                Collected information is used for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Providing healthcare services</li>
                <li>Patient care management</li>
                <li>Quality improvement</li>
                <li>Legal compliance</li>
                <li>System administration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
              <p className="text-gray-600 mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Encryption of sensitive data</li>
                <li>Access controls and authentication</li>
                <li>Regular security audits</li>
                <li>Staff training on data protection</li>
                <li>Secure data backup systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
              <p className="text-gray-600">
                Information may be shared with:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>Healthcare providers involved in patient care</li>
                <li>Authorized hospital staff</li>
                <li>Regulatory authorities as required by law</li>
                <li>Third-party service providers (with appropriate safeguards)</li>
              </ul>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 text-center">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;