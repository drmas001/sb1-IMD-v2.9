import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usePatientStore } from '../../stores/usePatientStore';
import { formatDate } from '../../utils/dateFormat';

interface DischargeStatsProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const DischargeStats: React.FC<DischargeStatsProps> = ({ dateFilter }) => {
  const { patients } = usePatientStore();

  const getDischargeData = () => {
    const dischargedPatients = patients.filter(patient =>
      patient.admissions?.some(admission =>
        admission.status === 'discharged' &&
        admission.discharge_date &&
        new Date(admission.discharge_date) >= new Date(dateFilter.startDate) &&
        new Date(admission.discharge_date) <= new Date(dateFilter.endDate)
      )
    );

    const specialtyData = new Map();
    dischargedPatients.forEach(patient => {
      const admission = patient.admissions?.find(a => a.status === 'discharged');
      if (admission) {
        const specialty = admission.department;
        const currentCount = specialtyData.get(specialty) || 0;
        specialtyData.set(specialty, currentCount + 1);
      }
    });

    return Array.from(specialtyData.entries()).map(([specialty, count]) => ({
      specialty,
      discharges: count
    }));
  };

  const calculateAverageStay = () => {
    const dischargedPatients = patients.filter(patient =>
      patient.admissions?.some(admission =>
        admission.status === 'discharged' &&
        admission.discharge_date &&
        new Date(admission.discharge_date) >= new Date(dateFilter.startDate) &&
        new Date(admission.discharge_date) <= new Date(dateFilter.endDate)
      )
    );

    if (dischargedPatients.length === 0) return 0;

    const totalDays = dischargedPatients.reduce((sum, patient) => {
      const admission = patient.admissions?.find(a => a.status === 'discharged');
      if (admission && admission.discharge_date) {
        const admissionDate = new Date(admission.admission_date);
        const dischargeDate = new Date(admission.discharge_date);
        const days = Math.ceil((dischargeDate.getTime() - admissionDate.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }
      return sum;
    }, 0);

    return Math.round(totalDays / dischargedPatients.length);
  };

  const data = getDischargeData();
  const averageStay = calculateAverageStay();
  const totalDischarges = data.reduce((sum, item) => sum + item.discharges, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Discharge Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm font-medium text-indigo-600">Total Discharges</p>
          <p className="text-2xl font-bold text-indigo-900">{totalDischarges}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Average Length of Stay</p>
          <p className="text-2xl font-bold text-green-900">{averageStay} days</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Discharge Rate</p>
          <p className="text-2xl font-bold text-blue-900">
            {Math.round((totalDischarges / patients.length) * 100)}%
          </p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="specialty"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="discharges"
              name="Discharged Patients"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(item => (
          <div
            key={item.specialty}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium text-gray-900 mb-2">{item.specialty}</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                Discharges: <span className="font-medium text-gray-900">{item.discharges}</span>
              </p>
              <p className="text-sm text-gray-600">
                Rate: <span className="font-medium text-gray-900">
                  {Math.round((item.discharges / totalDischarges) * 100)}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DischargeStats;