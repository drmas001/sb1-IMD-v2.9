import React from 'react';
import PatientHeader from '../components/PatientProfile/PatientHeader';
import PatientInfo from '../components/PatientProfile/PatientInfo';
import AdmissionHistory from '../components/PatientProfile/AdmissionHistory';
import MedicalNotes from '../components/PatientProfile/MedicalNotes';

const PatientProfile = () => {
  return (
    <div className="flex-1 p-6">
      <PatientHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1 space-y-6">
          <PatientInfo />
          <AdmissionHistory />
        </div>
        <div className="lg:col-span-2">
          <MedicalNotes />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;