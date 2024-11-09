import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { ASSETS } from '../config/assets';

const LandingPage: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = '/login';
  };

  const handleLearnMore = () => {
    window.location.href = '/about';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow flex items-center justify-center bg-gray-50 relative px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ASSETS.LOGO.THUMBPRINT})`
          }}
        />

        <div className="max-w-7xl mx-auto py-12 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Logo size="hero" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to IMD-Care
          </h1>

          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline Your Patient Management
          </p>

          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={handleGetStarted}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                onClick={handleLearnMore}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Learn More
                <BookOpen className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;