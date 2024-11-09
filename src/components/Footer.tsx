import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a 
              href="/about" 
              className="text-base text-gray-500 hover:text-gray-900"
            >
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a 
              href="/terms" 
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Terms & Conditions
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          © {new Date().getFullYear()} IMD-Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;