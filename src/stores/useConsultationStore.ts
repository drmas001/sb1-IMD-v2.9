import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Consultation = Database['public']['Tables']['consultations']['Row'];
type ConsultationInsert = Database['public']['Tables']['consultations']['Insert'];
type ConsultationUpdate = Database['public']['Tables']['consultations']['Update'];

interface ConsultationStore {
  consultations: Consultation[];
  loading: boolean;
  error: string | null;
  fetchConsultations: () => Promise<void>;
  addConsultation: (consultation: Omit<ConsultationInsert, 'id' | 'created_at' | 'updated_at'>) => Promise<Consultation | null>;
  updateConsultation: (id: number, updates: ConsultationUpdate) => Promise<void>;
  getConsultationById: (id: number) => Promise<Consultation | null>;
}

export const useConsultationStore = create<ConsultationStore>((set, get) => ({
  consultations: [],
  loading: false,
  error: null,

  fetchConsultations: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ consultations: data || [], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addConsultation: async (consultation) => {
    set({ loading: true, error: null });
    try {
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('id')
        .eq('mrn', consultation.mrn)
        .single();

      if (patientError) {
        // Create new patient if not found
        const { data: newPatient, error: createError } = await supabase
          .from('patients')
          .insert([{
            mrn: consultation.mrn,
            name: consultation.patient_name,
            gender: consultation.gender,
            date_of_birth: new Date(new Date().getFullYear() - consultation.age, 0, 1).toISOString()
          }])
          .select()
          .single();

        if (createError) throw createError;
        consultation.patient_id = newPatient.id;
      } else {
        consultation.patient_id = patientData.id;
      }

      const { data, error } = await supabase
        .from('consultations')
        .insert([{
          ...consultation,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        consultations: [data, ...state.consultations],
        loading: false
      }));

      return data;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  updateConsultation: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('consultations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      set(state => ({
        consultations: state.consultations.map(c => c.id === id ? data : c),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getConsultationById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching consultation:', error);
      return null;
    }
  }
}));