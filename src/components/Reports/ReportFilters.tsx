import React, { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';

interface ReportFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    reportType: 'all',
    specialty: 'all',
    searchQuery: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateFrom: '',
      dateTo: '',
      reportType: 'all',
      specialty: 'all',
      searchQuery: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const specialties = [
    'Internal Medicine',
    'Pulmonology',
    'Neurology',
    'Gastroenterology',
    'Endocrinology',
    'Hematology',
    'Infectious Disease',
    'Thrombosis Medicine',
    'Immunology & Allergy',
    'Safety Admission'
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Report Filters</h2>
        <button 
          onClick={handleReset}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Type
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="all">All Reports</option>
              <option value="admissions">Admissions</option>
              <option value="consultations">Consultations</option>
              <option value="discharges">Discharges</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <select
            name="specialty"
            value={filters.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          >
            <option value="all">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="searchQuery"
          value={filters.searchQuery}
          onChange={handleChange}
          placeholder="Search by MRN, patient name, or doctor..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default ReportFilters;