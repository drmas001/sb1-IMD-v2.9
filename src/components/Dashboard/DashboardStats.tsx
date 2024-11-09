import React from 'react';
import { Users, UserCheck } from 'lucide-react';
import { usePatientStore } from '../../stores/usePatientStore';

const DashboardStats: React.FC = () => {
  const { patients } = usePatientStore();
  const totalPatients = patients.length;
  const activePatients = patients.filter(patient => 
    patient.admissions?.[0]?.status === 'active'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Total Patients</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Active Patients</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{activePatients}</p>
      </div>
    </div>
  );
};

export default DashboardStats;