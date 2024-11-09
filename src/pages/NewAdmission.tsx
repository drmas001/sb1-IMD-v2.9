import React from 'react';
import AdmissionForm from '../components/NewAdmission/AdmissionForm';

const NewAdmission: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Patient Admission</h1>
        <p className="text-gray-600">Register a new patient admission</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <AdmissionForm />
      </div>
    </div>
  );
};

export default NewAdmission;