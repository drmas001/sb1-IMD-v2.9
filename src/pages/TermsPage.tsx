import React from 'react';
import { ArrowLeft, Book } from 'lucide-react';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
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
              <Book className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By using IMD-Care, you agree to comply with and be bound by these terms and conditions. 
                If you do not agree with these terms, please refrain from using the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data Confidentiality</h2>
              <p className="text-gray-600">
                IMD-Care is committed to maintaining the confidentiality of patient data. All patient 
                information is securely stored, and only authorized personnel have access to it. Users 
                must ensure that they do not share any patient data outside the application to protect 
                patient privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600">
                Users of IMD-Care, including medical staff, must use the application responsibly. They 
                are expected to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>Enter accurate information</li>
                <li>Update patient records as needed</li>
                <li>Comply with hospital policies regarding data handling</li>
                <li>Maintain confidentiality of access credentials</li>
                <li>Report any security concerns immediately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-600">
                IMD-Care is provided as a tool to assist healthcare professionals in managing patient care. 
                While every effort is made to ensure the accuracy of the information provided, IMD-Care is 
                not liable for any errors or omissions in the data or for any decisions made based on the 
                information provided by the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Access and Security</h2>
              <p className="text-gray-600">
                Access to IMD-Care is restricted to authorized personnel only. Users must keep their login 
                credentials secure and must not share them with anyone else. Any unauthorized access or use 
                of the application will be subject to disciplinary action as per hospital policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
              <p className="text-gray-600">
                IMD-Care reserves the right to modify these terms and conditions at any time. Users will 
                be notified of any significant changes, and continued use of the application will indicate 
                acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;