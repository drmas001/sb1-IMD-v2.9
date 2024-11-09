import React from 'react';
import { Pill, Clock, AlertCircle } from 'lucide-react';

const medications = [
  {
    id: 1,
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Every 8 hours',
    route: 'Oral',
    startDate: '2024-03-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Paracetamol',
    dosage: '1000mg',
    frequency: 'Every 6 hours PRN',
    route: 'Oral',
    startDate: '2024-03-15',
    status: 'active'
  },
  {
    id: 3,
    name: 'Salbutamol',
    dosage: '100mcg',
    frequency: 'Every 4-6 hours PRN',
    route: 'Inhalation',
    startDate: '2024-03-15',
    status: 'discontinued',
    stopDate: '2024-03-18'
  }
];

const Medications = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 flex items-center space-x-2">
          <Pill className="h-4 w-4" />
          <span>Add Medication</span>
        </button>
      </div>

      <div className="space-y-4">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className={`p-4 border rounded-lg ${
              medication.status === 'active' ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Pill className={`h-5 w-5 mt-0.5 ${
                  medication.status === 'active' ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{medication.name}</h3>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.route}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {medication.frequency}
                    </div>
                    {medication.status === 'discontinued' && (
                      <div className="flex items-center text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Discontinued on {medication.stopDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {medication.status === 'active' && (
                <button className="text-sm text-red-600 hover:text-red-700">
                  Discontinue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medications;