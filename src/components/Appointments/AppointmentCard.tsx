import React from 'react';
import { Calendar, User, Check, X } from 'lucide-react';
import { formatDate } from '../../utils/dateFormat';

interface AppointmentCardProps {
  appointment: any;
  onStatusChange: (id: number, status: 'completed' | 'cancelled') => Promise<void>;
  onViewDetails: (appointment: any) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStatusChange,
  onViewDetails,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onViewDetails(appointment)}
          >
            <User className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">{appointment.patientName}</span>
            <span className="text-gray-500">({appointment.medicalNumber})</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(appointment.createdAt)}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Specialty:</span> {appointment.specialty}
          </div>

          {appointment.notes && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            appointment.appointmentType === 'urgent'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {appointment.appointmentType}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            appointment.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : appointment.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {appointment.status}
          </span>

          {appointment.status === 'pending' && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => onStatusChange(appointment.id, 'completed')}
                className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                title="Mark as completed"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => onStatusChange(appointment.id, 'cancelled')}
                className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                title="Cancel appointment"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;