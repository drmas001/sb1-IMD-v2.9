import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUserStore } from '../../stores/useUserStore';
import { usePatientStore } from '../../stores/usePatientStore';
import { useConsultationStore } from '../../stores/useConsultationStore';

interface DoctorStatsProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const VALID_SPECIALTIES = [
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

const DoctorStats: React.FC<DoctorStatsProps> = ({ dateFilter }) => {
  const { users } = useUserStore();
  const { patients } = usePatientStore();
  const { consultations } = useConsultationStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const doctors = users.filter(user => 
    user.role === 'doctor' && 
    user.status === 'active' &&
    (selectedSpecialty === 'all' || user.department === selectedSpecialty)
  );

  const getDoctorData = () => {
    return doctors.map(doctor => {
      const activePatients = patients.filter(patient => 
        patient.admissions?.some(admission => 
          admission.admitting_doctor_id === doctor.id &&
          admission.status === 'active' &&
          new Date(admission.admission_date) >= new Date(dateFilter.startDate) &&
          new Date(admission.admission_date) <= new Date(dateFilter.endDate)
        )
      ).length;

      const pendingConsultations = consultations.filter(consultation =>
        consultation.doctor_id === doctor.id &&
        consultation.status === 'active' &&
        new Date(consultation.created_at) >= new Date(dateFilter.startDate) &&
        new Date(consultation.created_at) <= new Date(dateFilter.endDate)
      ).length;

      return {
        name: doctor.name,
        patients: activePatients,
        consultations: pendingConsultations,
        department: doctor.department
      };
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Doctor Workload</h2>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          >
            <option value="all">All Specialties</option>
            {VALID_SPECIALTIES.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getDoctorData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-medium text-gray-900">{payload[0].payload.name}</p>
                      <p className="text-sm text-gray-600">{payload[0].payload.department}</p>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="text-indigo-600">Active Patients:</span> {payload[0].value}
                        </p>
                        <p className="text-sm">
                          <span className="text-green-600">Pending Consultations:</span> {payload[1].value}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar 
              dataKey="patients" 
              name="Active Patients" 
              fill="#4f46e5" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="consultations" 
              name="Pending Consultations" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm font-medium text-indigo-600">Average Patients per Doctor</p>
          <p className="text-2xl font-bold text-indigo-900">
            {doctors.length ? Math.round(getDoctorData().reduce((sum, doc) => sum + doc.patients, 0) / doctors.length) : 0}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Average Consultations per Doctor</p>
          <p className="text-2xl font-bold text-green-900">
            {doctors.length ? Math.round(getDoctorData().reduce((sum, doc) => sum + doc.consultations, 0) / doctors.length) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorStats;