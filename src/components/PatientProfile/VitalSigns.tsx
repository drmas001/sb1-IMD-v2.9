import React from 'react';
import { Activity, Heart, Thermometer, Wind } from 'lucide-react';

const VitalSigns = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Vital Signs</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Heart Rate</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">72 <span className="text-sm text-gray-600">bpm</span></p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
          </div>
          <p className="text-2xl font-bold text-green-600">120/80</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Thermometer className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Temperature</span>
          </div>
          <p className="text-2xl font-bold text-red-600">37.2 <span className="text-sm text-gray-600">°C</span></p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Wind className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Oxygen Saturation</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">98 <span className="text-sm text-gray-600">%</span></p>
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;