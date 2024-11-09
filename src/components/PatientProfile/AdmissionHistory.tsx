import React, { useEffect } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { usePatientStore } from '../../stores/usePatientStore';
import { useAdmissionStore } from '../../stores/useAdmissionStore';
import { formatDate } from '../../utils/dateFormat';
import SafetyBadge from './SafetyBadge';

const AdmissionHistory = () => {
  const { selectedPatient } = usePatientStore();
  const { admissions, loading, error, fetchAdmissions } = useAdmissionStore();

  useEffect(() => {
    if (selectedPatient?.id) {
      fetchAdmissions(selectedPatient.id);
    }
  }, [selectedPatient?.id, fetchAdmissions]);

  if (!selectedPatient) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-2" />
          <p>Select a patient to view admission history</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Admission History</h2>
      
      <div className="space-y-4">
        {admissions.length === 0 ? (
          <p className="text-center text-gray-500">No admission history available</p>
        ) : (
          admissions.map((admission) => (
            <div
              key={admission.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    Visit #{admission.visit_number}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admission.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : admission.status === 'discharged'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {admission.status}
                    </span>
                    {admission.safety_type && (
                      <SafetyBadge type={admission.safety_type} />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Admitted: {formatDate(admission.admission_date)}
                </p>
                <p className="text-sm text-gray-600">{admission.department}</p>
                <p className="text-sm text-gray-600">{admission.doctor_name}</p>
                {admission.discharge_date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Discharged: {formatDate(admission.discharge_date)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdmissionHistory;