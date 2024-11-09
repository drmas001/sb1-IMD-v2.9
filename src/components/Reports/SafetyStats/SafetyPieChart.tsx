import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SafetyData {
  type: string;
  count: number;
  color: string;
  description: string;
}

interface SafetyPieChartProps {
  data: SafetyData[];
}

const SafetyPieChart: React.FC<SafetyPieChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">Distribution by Type</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ type, count }) => `${type}: ${count}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-medium text-gray-900">{data.type}</p>
                      <p className="text-gray-600">{data.count} patients</p>
                      <p className="text-sm text-gray-500 mt-1">{data.description}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SafetyPieChart;