import React, { useState } from 'react';
import { User, MapPin, Stethoscope, Clock, AlertCircle } from 'lucide-react';
import { useConsultationStore } from '../../stores/useConsultationStore';
import { useNavigate } from '../../hooks/useNavigate';

interface ConsultationFormData {
  mrn: string;
  patient_name: string;
  age: number;
  gender: 'male' | 'female';
  requesting_department: string;
  patient_location: string;
  consultation_specialty: string;
  shift_type: 'morning' | 'evening' | 'night';
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: string;
}

const ConsultationForm: React.FC = () => {
  const { addConsultation, loading, error } = useConsultationStore();
  const { goBack } = useNavigate();
  const [formData, setFormData] = useState<ConsultationFormData>({
    mrn: '',
    patient_name: '',
    age: 0,
    gender: 'male',
    requesting_department: '',
    patient_location: '',
    consultation_specialty: '',
    shift_type: 'morning',
    urgency: 'routine',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addConsultation({
        ...formData,
        age: Number(formData.age)
      });

      if (result) {
        alert('Consultation request submitted successfully!');
        goBack();
      }
    } catch (err) {
      console.error('Error submitting consultation:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MRN */}
        <div>
          <label htmlFor="mrn" className="block text-sm font-medium text-gray-700 mb-1">
            MRN
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              #
            </span>
            <input
              type="text"
              id="mrn"
              name="mrn"
              value={formData.mrn}
              onChange={handleChange}
              className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="12345"
              required
            />
          </div>
        </div>

        {/* Patient Name */}
        <div>
          <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="150"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Requesting Department */}
        <div>
          <label htmlFor="requesting_department" className="block text-sm font-medium text-gray-700 mb-1">
            Requesting Department
          </label>
          <input
            type="text"
            id="requesting_department"
            name="requesting_department"
            value={formData.requesting_department}
            onChange={handleChange}
            placeholder="Enter department name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>

        {/* Patient Location */}
        <div>
          <label htmlFor="patient_location" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="patient_location"
              name="patient_location"
              value={formData.patient_location}
              onChange={handleChange}
              placeholder="Room 123, Bed 1"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Consultation Specialty */}
        <div>
          <label htmlFor="consultation_specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Specialty
          </label>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="consultation_specialty"
              name="consultation_specialty"
              value={formData.consultation_specialty}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            >
              <option value="">Select specialty</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Neurology">Neurology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Hematology">Hematology</option>
              <option value="Infectious Disease">Infectious Disease</option>
              <option value="Thrombosis Medicine">Thrombosis Medicine</option>
              <option value="Immunology & Allergy">Immunology & Allergy</option>
            </select>
          </div>
        </div>

        {/* Shift Type */}
        <div>
          <label htmlFor="shift_type" className="block text-sm font-medium text-gray-700 mb-1">
            Shift Type
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="shift_type"
              name="shift_type"
              value={formData.shift_type}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="routine">Routine</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      {/* Reason for Consultation */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Consultation
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={goBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Request Consultation'}
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;