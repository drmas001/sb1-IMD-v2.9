import React, { useState } from 'react';
import { usePatientStore } from '../../stores/usePatientStore';
import { useConsultationStore } from '../../stores/useConsultationStore';
import { useAppointmentStore } from '../../stores/useAppointmentStore';
import { exportToPDF } from '../../utils/pdfExport';
import { Download, Printer } from 'lucide-react';

const UserReports: React.FC = () => {
  const { patients } = usePatientStore();
  const { consultations } = useConsultationStore();
  const { appointments } = useAppointmentStore();
  const [activeTab, setActiveTab] = useState('all');
  const [specialty, setSpecialty] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const specialties = [
    'Internal Medicine',
    'Pulmonology',
    'Neurology',
    'Gastroenterology',
    'Rheumatology',
    'Endocrinology',
    'Hematology',
    'Infectious Disease',
    'Thrombosis Medicine',
    'Immunology & Allergy'
  ];

  const handleExport = async () => {
    try {
      await exportToPDF({
        patients: getFilteredPatients(),
        consultations: getFilteredConsultations(),
        appointments: getFilteredAppointments(),
        activeTab,
        dateFilter: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          period: 'custom'
        }
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getFilteredPatients = () => {
    return patients.filter(patient => {
      const matchesSpecialty = specialty === 'all' || patient.department === specialty;
      const matchesDate = !dateRange.startDate || !dateRange.endDate || (
        patient.admission_date >= dateRange.startDate &&
        patient.admission_date <= dateRange.endDate
      );
      return matchesSpecialty && matchesDate;
    });
  };

  const getFilteredConsultations = () => {
    return consultations.filter(consultation => {
      const matchesSpecialty = specialty === 'all' || consultation.consultation_specialty === specialty;
      const matchesDate = !dateRange.startDate || !dateRange.endDate || (
        consultation.created_at >= dateRange.startDate &&
        consultation.created_at <= dateRange.endDate
      );
      return matchesSpecialty && matchesDate;
    });
  };

  const getFilteredAppointments = () => {
    return appointments.filter(appointment => {
      const matchesSpecialty = specialty === 'all' || appointment.specialty === specialty;
      const matchesDate = !dateRange.startDate || !dateRange.endDate || (
        appointment.createdAt >= dateRange.startDate &&
        appointment.createdAt <= dateRange.endDate
      );
      return matchesSpecialty && matchesDate;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Reports</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="admissions">Active Admissions</option>
                <option value="consultations">Medical Consultations</option>
                <option value="appointments">Clinic Appointments</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="all">All Specialties</option>
                {specialties.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Active Admissions */}
          {(activeTab === 'all' || activeTab === 'admissions') && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Admissions</h3>
              <div className="space-y-4">
                {getFilteredPatients().map((patient) => (
                  <div key={patient.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Patient Name</p>
                        <p className="font-medium">{patient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">MRN</p>
                        <p className="font-medium">{patient.mrn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{patient.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Admission Date</p>
                        <p className="font-medium">
                          {new Date(patient.admission_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Diagnosis</p>
                        <p className="font-medium">{patient.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Doctor</p>
                        <p className="font-medium">{patient.doctor_name}</p>
                      </div>
                      {patient.admissions?.[0]?.safety_type && (
                        <div>
                          <p className="text-sm text-gray-600">Safety Type</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            patient.admissions[0].safety_type === 'emergency'
                              ? 'bg-red-100 text-red-800'
                              : patient.admissions[0].safety_type === 'observation'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {patient.admissions[0].safety_type}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Consultations */}
          {(activeTab === 'all' || activeTab === 'consultations') && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Consultations</h3>
              <div className="space-y-4">
                {getFilteredConsultations().map((consultation) => (
                  <div key={consultation.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Patient Name</p>
                        <p className="font-medium">{consultation.patient_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">MRN</p>
                        <p className="font-medium">{consultation.mrn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Specialty</p>
                        <p className="font-medium">{consultation.consultation_specialty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">
                          {new Date(consultation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Urgency</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          consultation.urgency === 'emergency'
                            ? 'bg-red-100 text-red-800'
                            : consultation.urgency === 'urgent'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {consultation.urgency.toUpperCase()}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium">{consultation.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinic Appointments */}
          {(activeTab === 'all' || activeTab === 'appointments') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Appointments</h3>
              <div className="space-y-4">
                {getFilteredAppointments().map((appointment) => (
                  <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Patient Name</p>
                        <p className="font-medium">{appointment.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">MRN</p>
                        <p className="font-medium">{appointment.medicalNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Specialty</p>
                        <p className="font-medium">{appointment.specialty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">
                          {new Date(appointment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.appointmentType === 'urgent'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.appointmentType.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Notes</p>
                        <p className="font-medium">{appointment.notes || 'No notes'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReports;