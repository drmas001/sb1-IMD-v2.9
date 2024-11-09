import React from 'react';
import { Users, Stethoscope, Shield } from 'lucide-react';
import { usePatientStore } from '../stores/usePatientStore';
import { useConsultationStore } from '../stores/useConsultationStore';
import { useNavigate } from '../hooks/useNavigate';

const specialties = [
  { name: 'Internal Medicine', color: 'blue' },
  { name: 'Pulmonology', color: 'green' },
  { name: 'Neurology', color: 'purple' },
  { name: 'Gastroenterology', color: 'yellow' },
  { name: 'Rheumatology', color: 'pink' },
  { name: 'Endocrinology', color: 'indigo' },
  { name: 'Hematology', color: 'red' },
  { name: 'Infectious Disease', color: 'orange' },
  { name: 'Thrombosis Medicine', color: 'cyan' },
  { name: 'Immunology & Allergy', color: 'emerald' },
  { name: 'Safety Admission', color: 'violet' }
];

const SpecialtiesGrid: React.FC = () => {
  const { patients } = usePatientStore();
  const { consultations } = useConsultationStore();

  const handleSpecialtyClick = (specialty: string) => {
    // Dispatch a custom navigation event
    const event = new CustomEvent('navigate', { 
      detail: {
        page: 'specialties',
        specialty: specialty
      }
    });
    window.dispatchEvent(event);
  };

  const getActivePatientsBySpecialty = (specialty: string) => {
    return patients.filter(patient => 
      patient.admissions?.some(admission => 
        admission.department === specialty && 
        admission.status === 'active'
      )
    );
  };

  const getReadmissionCount = (specialty: string) => {
    return patients.filter(patient =>
      patient.admissions?.filter(admission => 
        admission.department === specialty && 
        admission.status === 'active' &&
        admission.visit_number > 1
      ).length > 0
    ).length;
  };

  const getSafetyTypeCount = (specialty: string, type: string) => {
    return patients.filter(patient => 
      patient.admissions?.some(admission => 
        admission.department === specialty && 
        admission.status === 'active' &&
        admission.safety_type === type
      )
    ).length;
  };

  const getPendingConsultationsBySpecialty = (specialty: string) => {
    return consultations.filter(consultation => 
      consultation.consultation_specialty === specialty && 
      consultation.status === 'active'
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {specialties.map((specialty) => {
        const activePatients = getActivePatientsBySpecialty(specialty.name);
        const readmissionCount = getReadmissionCount(specialty.name);
        const emergencyCount = getSafetyTypeCount(specialty.name, 'emergency');
        const observationCount = getSafetyTypeCount(specialty.name, 'observation');
        const shortStayCount = getSafetyTypeCount(specialty.name, 'short-stay');
        const pendingConsultations = getPendingConsultationsBySpecialty(specialty.name);
        
        return (
          <button
            key={specialty.name}
            onClick={() => handleSpecialtyClick(specialty.name)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left w-full"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${specialty.color}-100 text-${specialty.color}-600 mb-4`}>
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {specialty.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Patients</span>
                <div className="flex items-center space-x-2">
                  {(emergencyCount > 0 || observationCount > 0 || shortStayCount > 0) && (
                    <div className="flex space-x-1">
                      {emergencyCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Shield className="h-3 w-3 mr-1" />
                          {emergencyCount}
                        </span>
                      )}
                      {observationCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Shield className="h-3 w-3 mr-1" />
                          {observationCount}
                        </span>
                      )}
                      {shortStayCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          {shortStayCount}
                        </span>
                      )}
                    </div>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    {activePatients.length}
                  </span>
                </div>
              </div>
              {readmissionCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Readmissions</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {readmissionCount}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-gray-600">New Consultations</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  pendingConsultations > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {pendingConsultations}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SpecialtiesGrid;