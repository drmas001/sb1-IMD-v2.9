import React, { useEffect } from 'react';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { useAppointmentStore } from '../../stores/useAppointmentStore';

const AppointmentReports = () => {
  const { appointments, loading, error, fetchAppointments, removeExpiredAppointments } = useAppointmentStore();

  useEffect(() => {
    fetchAppointments();
    removeExpiredAppointments();

    // Set up interval to check for expired appointments every hour
    const interval = setInterval(removeExpiredAppointments, 3600000);
    return () => clearInterval(interval);
  }, [fetchAppointments, removeExpiredAppointments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments in the last 24 hours
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{appointment.patientName}</span>
                  <span className="text-gray-500">({appointment.medicalNumber})</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(appointment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(appointment.createdAt).toLocaleTimeString()}</span>
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
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentReports;