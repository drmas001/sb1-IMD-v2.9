import React, { useState } from 'react';
import { User, Hash, FileText, AlertCircle } from 'lucide-react';
import { useAppointmentStore } from '../../stores/useAppointmentStore';

interface ClinicAppointmentFormProps {
  onSuccess: () => void;
}

type AppointmentType = 'routine' | 'urgent';

interface FormData {
  mrn: string;
  name: string;
  specialty: string;
  appointmentType: AppointmentType;
  reason: string;
}

const initialFormData: FormData = {
  mrn: '',
  name: '',
  specialty: '',
  appointmentType: 'routine',
  reason: ''
};

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

const ClinicAppointmentForm: React.FC<ClinicAppointmentFormProps> = ({ onSuccess }) => {
  const { addAppointment, loading } = useAppointmentStore();
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      await addAppointment({
        medicalNumber: formData.mrn,
        patientName: formData.name,
        specialty: formData.specialty,
        appointmentType: formData.appointmentType,
        notes: formData.reason,
        status: 'pending'
      });

      onSuccess();
    } catch (error) {
      setFormError('Failed to book appointment. Please try again.');
      console.error('Appointment booking error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mrn" className="block text-sm font-medium text-gray-700 mb-1">
            MRN
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="mrn"
              name="mrn"
              value={formData.mrn}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="">Select Specialty</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Type
          </label>
          <select
            id="appointmentType"
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="routine">Routine</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Visit
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Booking...</span>
            </>
          ) : (
            <span>Book Appointment</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClinicAppointmentForm;