import React, { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (medicalCode: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading = false, error }) => {
  const [medicalCode, setMedicalCode] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!medicalCode.trim()) {
      setFormError('Medical code is required');
      return;
    }

    try {
      await onLogin(medicalCode);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="medicalCode" className="block text-sm font-medium text-gray-700 mb-2">
          Medical Code
        </label>
        <input
          id="medicalCode"
          type="text"
          value={medicalCode}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            setMedicalCode(value);
            setFormError('');
          }}
          placeholder="Enter your medical code"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors placeholder:text-gray-400"
          required
          disabled={loading}
        />
        {(formError || error) && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{formError || error}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !medicalCode}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;