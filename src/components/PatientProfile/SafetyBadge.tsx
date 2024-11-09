import React from 'react';
import { Shield } from 'lucide-react';
import { SAFETY_DESCRIPTIONS } from '../Reports/SafetyStats/constants';

interface SafetyBadgeProps {
  type: 'emergency' | 'observation' | 'short-stay';
  showDescription?: boolean;
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ type, showDescription = false }) => {
  const getBadgeColor = () => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'observation': return 'bg-yellow-100 text-yellow-800';
      case 'short-stay': return 'bg-green-100 text-green-800';
      default: return '';
    }
  };

  const formattedType = type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="space-y-1">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor()}`}>
        <Shield className="h-3 w-3 mr-1" />
        Safety - {formattedType}
      </span>
      {showDescription && (
        <p className="text-xs text-gray-500">
          {SAFETY_DESCRIPTIONS[type]}
        </p>
      )}
    </div>
  );
};

export default SafetyBadge;