import React from 'react';
import ConsultationForm from '../components/Consultation/ConsultationForm';

const ConsultationRegistration: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medical Consultation Registration</h1>
        <p className="text-gray-600">Register a new medical consultation request</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ConsultationForm />
      </div>
    </div>
  );
};

export default ConsultationRegistration;