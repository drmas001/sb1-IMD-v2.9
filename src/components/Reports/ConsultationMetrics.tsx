import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useConsultationStore } from '../../stores/useConsultationStore';

interface ConsultationMetricsProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const COLORS = {
  emergency: '#ef4444',
  urgent: '#f59e0b',
  routine: '#10b981'
};

const ConsultationMetrics: React.FC<ConsultationMetricsProps> = ({ dateFilter }) => {
  const { consultations } = useConsultationStore();

  const getFilteredConsultations = () => {
    return consultations.filter(consultation =>
      new Date(consultation.created_at) >= new Date(dateFilter.startDate) &&
      new Date(consultation.created_at) <= new Date(dateFilter.endDate)
    );
  };

  const getUrgencyData = () => {
    const filtered = getFilteredConsultations();
    const counts = {
      emergency: 0,
      urgent: 0,
      routine: 0
    };

    filtered.forEach(consultation => {
      counts[consultation.urgency]++;
    });

    return Object.entries(counts).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value
    }));
  };

  const getResponseTimes = () => {
    const filtered = getFilteredConsultations();
    const times = {
      emergency: [],
      urgent: [],
      routine: []
    };

    filtered.forEach(consultation => {
      if (consultation.response_time) {
        times[consultation.urgency].push(consultation.response_time);
      }
    });

    return Object.entries(times).map(([key, values]) => ({
      type: key,
      average: values.length ? 
        Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 
        0
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Consultation Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Consultation Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getUrgencyData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {getUrgencyData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Average Response Times</h3>
          <div className="space-y-4">
            {getResponseTimes().map(({ type, average }) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full bg-${COLORS[type as keyof typeof COLORS]}`} />
                  <span className="text-sm text-gray-600 capitalize">{type}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {average} minutes
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getUrgencyData().map(({ name, value }) => (
            <div 
              key={name}
              className={`p-4 rounded-lg ${
                name === 'Emergency' ? 'bg-red-50' :
                name === 'Urgent' ? 'bg-yellow-50' : 'bg-green-50'
              }`}
            >
              <p className={`text-sm font-medium ${
                name === 'Emergency' ? 'text-red-600' :
                name === 'Urgent' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {name} Consultations
              </p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationMetrics;