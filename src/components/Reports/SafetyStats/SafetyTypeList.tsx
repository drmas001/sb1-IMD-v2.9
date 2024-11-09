import React from 'react';
import { Shield } from 'lucide-react';

interface SafetyTypeData {
  type: string;
  count: number;
  color: string;
  description: string;
}

interface SafetyTypeListProps {
  data: SafetyTypeData[];
  total: number;
}

const SafetyTypeList: React.FC<SafetyTypeListProps> = ({ data, total }) => {
  return (
    <div className="space-y-4">
      {data.map(({ type, count, color, description }) => (
        <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <div>
              <span className="text-sm font-medium text-gray-900">{type}</span>
              <p className="text-xs text-gray-500">
                {Math.round((count / (total || 1)) * 100)}% of safety admissions
              </p>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{count}</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              type === 'Emergency' 
                ? 'bg-red-100 text-red-800'
                : type === 'Observation'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              <Shield className="h-3 w-3 mr-1" />
              {type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyTypeList;