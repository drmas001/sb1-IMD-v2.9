import React from 'react';
import { Users, Stethoscope, Clock, TrendingUp } from 'lucide-react';
import { usePatientStore } from '../../stores/usePatientStore';
import { useConsultationStore } from '../../stores/useConsultationStore';

interface ReportSummaryProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const ReportSummary: React.FC<ReportSummaryProps> = ({ dateFilter }) => {
  const { patients } = usePatientStore();
  const { consultations } = useConsultationStore();

  const activePatients = patients.filter(patient => 
    patient.admissions?.some(admission => 
      admission.status === 'active' &&
      new Date(admission.admission_date) >= new Date(dateFilter.startDate) &&
      new Date(admission.admission_date) <= new Date(dateFilter.endDate)
    )
  );

  const activeConsultations = consultations.filter(consultation =>
    consultation.status === 'active' &&
    new Date(consultation.created_at) >= new Date(dateFilter.startDate) &&
    new Date(consultation.created_at) <= new Date(dateFilter.endDate)
  );

  const calculateAverageStay = () => {
    const completedAdmissions = patients
      .flatMap(patient => patient.admissions || [])
      .filter(admission => 
        admission.status === 'discharged' &&
        admission.discharge_date &&
        new Date(admission.admission_date) >= new Date(dateFilter.startDate) &&
        new Date(admission.admission_date) <= new Date(dateFilter.endDate)
      );

    if (completedAdmissions.length === 0) return 0;

    const totalDays = completedAdmissions.reduce((sum, admission) => {
      const admissionDate = new Date(admission.admission_date);
      const dischargeDate = new Date(admission.discharge_date!);
      const days = Math.ceil((dischargeDate.getTime() - admissionDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    return Math.round(totalDays / completedAdmissions.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Total Patients</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{activePatients.length}</p>
        <p className="text-sm text-gray-600 mt-1">Currently admitted</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Stethoscope className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Consultations</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{activeConsultations.length}</p>
        <p className="text-sm text-gray-600 mt-1">Active consultations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Average Stay</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{calculateAverageStay()}</p>
        <p className="text-sm text-gray-600 mt-1">Days per patient</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Occupancy Rate</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {Math.round((activePatients.length / 100) * 100)}%
        </p>
        <p className="text-sm text-gray-600 mt-1">Current capacity</p>
      </div>
    </div>
  );
};

export default ReportSummary;