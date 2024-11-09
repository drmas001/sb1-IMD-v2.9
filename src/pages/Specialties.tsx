import React, { useEffect, useState } from 'react';
import { Users, Calendar, Stethoscope, Shield, RefreshCw } from 'lucide-react';
import { usePatientStore } from '../stores/usePatientStore';
import { useConsultationStore } from '../stores/useConsultationStore';
import SafetyBadge from '../components/PatientProfile/SafetyBadge';
import { formatDate } from '../utils/dateFormat';

interface SpecialtiesProps {
  onNavigateToPatient: () => void;
  selectedSpecialty?: string;
}

const Specialties: React.FC<SpecialtiesProps> = ({ onNavigateToPatient, selectedSpecialty }) => {
  const { patients, loading: loadingPatients, error: patientError, fetchPatients, setSelectedPatient } = usePatientStore();
  const { consultations, loading: loadingConsultations, error: consultationError, fetchConsultations } = useConsultationStore();
  const [viewType, setViewType] = useState<'all' | 'patients' | 'consultations'>('all');

  useEffect(() => {
    fetchPatients();
    fetchConsultations();
  }, [fetchPatients, fetchConsultations]);

  const filteredPatients = patients.filter(patient => 
    patient.admissions?.some(admission => 
      (!selectedSpecialty || admission.department === selectedSpecialty) && 
      admission.status === 'active'
    )
  );

  const filteredConsultations = consultations.filter(consultation => 
    (!selectedSpecialty || consultation.consultation_specialty === selectedSpecialty) && 
    consultation.status === 'active'
  );

  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient);
    onNavigateToPatient();
  };

  const handleConsultationClick = (consultation: any) => {
    // Create a patient-like object from consultation data
    const consultationPatient = {
      id: consultation.patient_id,
      mrn: consultation.mrn,
      name: consultation.patient_name,
      gender: consultation.gender,
      department: consultation.consultation_specialty,
      doctor_name: consultation.doctor_name,
      admission_date: consultation.created_at,
      diagnosis: consultation.reason,
      admissions: [{
        status: 'active',
        department: consultation.consultation_specialty,
        admission_date: consultation.created_at,
        discharge_date: null,
        diagnosis: consultation.reason,
        visit_number: 1,
        users: {
          name: consultation.doctor_name || 'Pending Assignment'
        }
      }]
    };

    setSelectedPatient(consultationPatient);
    onNavigateToPatient();
  };

  if (loadingPatients || loadingConsultations) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (patientError || consultationError) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error loading data: {patientError || consultationError}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedSpecialty || 'All Specialties'}
        </h1>
        <p className="text-gray-600">View patients and consultations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter View</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewType('all')}
              className={`px-4 py-2 text-sm rounded-lg ${
                viewType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setViewType('patients')}
              className={`px-4 py-2 text-sm rounded-lg ${
                viewType === 'patients'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setViewType('consultations')}
              className={`px-4 py-2 text-sm rounded-lg ${
                viewType === 'consultations'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Consultations
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {(viewType === 'all' || viewType === 'patients') && filteredPatients.map((patient) => {
          const activeAdmission = patient.admissions?.find(a => a.status === 'active');
          if (!activeAdmission) return null;

          return (
            <div
              key={`patient-${patient.id}-${activeAdmission.visit_number}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleViewDetails(patient)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(activeAdmission.admission_date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Stethoscope className="h-4 w-4 mr-1" />
                        {activeAdmission.users?.name || 'Not assigned'}
                      </div>
                      {activeAdmission.visit_number > 1 && (
                        <div className="flex items-center text-sm text-purple-600">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Visit #{activeAdmission.visit_number}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Inpatient
                  </span>
                  {activeAdmission.safety_type && (
                    <SafetyBadge type={activeAdmission.safety_type} />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {(viewType === 'all' || viewType === 'consultations') && filteredConsultations.map((consultation) => (
          <div
            key={`consultation-${consultation.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleConsultationClick(consultation)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{consultation.patient_name}</h3>
                  <p className="text-sm text-gray-600">MRN: {consultation.mrn}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(consultation.created_at)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {consultation.requesting_department}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Consultation
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  consultation.urgency === 'emergency'
                    ? 'bg-red-100 text-red-800'
                    : consultation.urgency === 'urgent'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {consultation.urgency}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reason:</span> {consultation.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialties;