import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usePatientStore } from '../../stores/usePatientStore';

interface OccupancyChartProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ dateFilter }) => {
  const { patients } = usePatientStore();

  const getOccupancyData = () => {
    const startDate = new Date(dateFilter.startDate);
    const endDate = new Date(dateFilter.endDate);
    const data = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      const activePatients = patients.filter(patient => 
        patient.admissions?.some(admission => 
          admission.status === 'active' &&
          new Date(admission.admission_date) <= date &&
          (!admission.discharge_date || new Date(admission.discharge_date) > date)
        )
      ).length;

      data.push({
        date: dateStr,
        occupancy: Math.round((activePatients / 100) * 100) // Assuming 100 beds capacity
      });
    }

    return data;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Occupancy Trend</h2>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getOccupancyData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis 
              unit="%" 
              domain={[0, 100]}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="occupancy" 
              name="Occupancy Rate" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <p>Based on total capacity of 100 beds</p>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span>Current Occupancy Rate</span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyChart;