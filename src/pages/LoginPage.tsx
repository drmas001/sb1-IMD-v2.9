import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import { useUserStore } from '../stores/useUserStore';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { login, loading, error } = useUserStore();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleLogin = async (medicalCode: string) => {
    try {
      setLoginError(null);
      await login(medicalCode);
      onLogin();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Failed to authenticate');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Logo size="medium" className="text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">IMD-Care</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h2>
            <p className="text-gray-600">
              Please sign in with your medical code
            </p>
          </div>
          
          <LoginForm 
            onLogin={handleLogin} 
            loading={loading}
            error={loginError || error}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;