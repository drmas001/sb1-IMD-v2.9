import React from 'react';
import { ArrowLeft, Users, Cog, BarChart, Shield, Heart, Stethoscope, Calendar, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { ASSETS } from '../config/assets';

const AboutPage: React.FC = () => {
  const handleBack = () => {
    window.location.href = '/';
  };

  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient tracking and management system with real-time updates and detailed patient profiles.'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Efficient appointment booking system with automated reminders and schedule management.'
    },
    {
      icon: Heart,
      title: 'Medical Records',
      description: 'Secure electronic medical records with easy access to patient history, treatments, and test results.'
    },
    {
      icon: Stethoscope,
      title: 'Department Management',
      description: 'Specialized tools for managing different medical departments and specialties.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Instant updates on patient status, consultations, and department activities.'
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics tools for monitoring department performance.'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security measures to protect sensitive medical data and ensure HIPAA compliance.'
    },
    {
      icon: Cog,
      title: 'Customization',
      description: 'Flexible system settings and configurations to match your specific department needs.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <button
        onClick={handleBack}
        className="fixed top-8 left-8 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors z-50"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Back to Dashboard</span>
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${ASSETS.LOGO.THUMBPRINT})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Logo size="large" className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              About IMD-Care
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Transforming Healthcare Management
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Project Overview</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  IMD-Care is a comprehensive digital solution for managing inpatient care in hospitals. 
                  The goal of this application is to enhance the quality of medical care by simplifying 
                  patient management and providing accurate, real-time information to the medical team. 
                  IMD-Care is designed to be an effective tool that helps doctors and nurses track 
                  patient status and make swift, informed decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-3xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Concept Development</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. Saad Mashbab Al-Qahtani, Head of Internal Medicine Departments at the Armed Forces 
                    Hospital in the South, developed the concept and supervised the project to ensure it 
                    meets the needs of healthcare.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Execution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. Mohammed Ayed Al-Shahri is responsible for the technical execution of the project, 
                    ensuring ease of use and efficiency in a hospital environment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;