import React from 'react';
import { AlertCircle } from 'lucide-react';

const SafetyLegend: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <AlertCircle className="h-4 w-4 text-gray-600" />
        <h4 className="text-sm font-medium text-gray-900">Safety Types Overview</h4>
      </div>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span>Emergency: Immediate medical attention required</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          <span>Observation: Close monitoring needed</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Short Stay: Brief admission for specific treatment</span>
        </li>
      </ul>
    </div>
  );
};

export default SafetyLegend;