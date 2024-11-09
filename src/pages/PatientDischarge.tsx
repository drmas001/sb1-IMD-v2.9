import React, { useEffect } from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import DischargeForm from '../components/Discharge/DischargeForm';
import DischargeSummary from '../components/Discharge/DischargeSummary';
import { AlertCircle } from 'lucide-react';

const PatientDischarge: React.FC = () => {
  const { selectedPatient } = usePatientStore();

  // Check if there's an active patient that can be discharged
  const canDischarge = selectedPatient?.admissions?.[0]?.status === 'active';

  if (!selectedPatient || !canDischarge) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Patient Discharge</h1>
          <p className="text-gray-600">Process patient discharge and create discharge summary</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                No Active Patient Selected
              </h3>
              <p className="text-yellow-700">
                Please select an active patient from the dashboard or specialties page to process a discharge.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Discharge</h1>
        <p className="text-gray-600">Process patient discharge and create discharge summary</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DischargeForm />
        <DischargeSummary />
      </div>
    </div>
  );
};

export default PatientDischarge;