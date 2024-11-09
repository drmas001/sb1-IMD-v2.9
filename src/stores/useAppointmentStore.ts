import { create } from 'zustand';
import { supabase } from '../lib/supabase';

type AppointmentType = 'routine' | 'urgent';
type AppointmentStatus = 'pending' | 'completed' | 'cancelled';

interface Appointment {
  id: number;
  patientName: string;
  medicalNumber: string;
  specialty: string;
  appointmentType: AppointmentType;
  notes: string;
  createdAt: string;
  status: AppointmentStatus;
}

interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>;
  updateAppointment: (id: number, updates: Partial<Appointment>) => Promise<void>;
  removeExpiredAppointments: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedAppointments = data?.map(appointment => ({
        id: appointment.id,
        patientName: appointment.patient_name,
        medicalNumber: appointment.medical_number,
        specialty: appointment.specialty,
        appointmentType: appointment.appointment_type as AppointmentType,
        notes: appointment.notes || '',
        createdAt: appointment.created_at,
        status: appointment.status as AppointmentStatus
      })) || [];

      set({ appointments: formattedAppointments, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addAppointment: async (appointment) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          patient_name: appointment.patientName,
          medical_number: appointment.medicalNumber,
          specialty: appointment.specialty,
          appointment_type: appointment.appointmentType,
          notes: appointment.notes,
          status: appointment.status
        }])
        .select()
        .single();

      if (error) throw error;

      const formattedAppointment = {
        id: data.id,
        patientName: data.patient_name,
        medicalNumber: data.medical_number,
        specialty: data.specialty,
        appointmentType: data.appointment_type as AppointmentType,
        notes: data.notes || '',
        createdAt: data.created_at,
        status: data.status as AppointmentStatus
      };

      set(state => ({
        appointments: [formattedAppointment, ...state.appointments],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  updateAppointment: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({
          status: updates.status,
          notes: updates.notes
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const formattedAppointment = {
        id: data.id,
        patientName: data.patient_name,
        medicalNumber: data.medical_number,
        specialty: data.specialty,
        appointmentType: data.appointment_type as AppointmentType,
        notes: data.notes || '',
        createdAt: data.created_at,
        status: data.status as AppointmentStatus
      };

      set(state => ({
        appointments: state.appointments.map(a => 
          a.id === id ? formattedAppointment : a
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  removeExpiredAppointments: async () => {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const { error } = await supabase
        .from('appointments')
        .delete()
        .lt('created_at', twentyFourHoursAgo.toISOString());

      if (error) throw error;
      await get().fetchAppointments();
    } catch (error) {
      console.error('Error removing expired appointments:', error);
    }
  }
}));