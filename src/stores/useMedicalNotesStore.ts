import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface MedicalNote {
  id: number;
  patient_id: number;
  doctor_id: number;
  doctor_name: string;
  note_type: 'Progress Note' | 'Follow-up Note' | 'Consultation Note' | 'Discharge Note' | 'Discharge Summary';
  content: string;
  created_at: string;
}

interface MedicalNotesStore {
  notes: MedicalNote[];
  loading: boolean;
  error: string | null;
  fetchNotes: (patientId: number) => Promise<void>;
  addNote: (note: Omit<MedicalNote, 'id' | 'created_at' | 'doctor_name'>) => Promise<void>;
}

export const useMedicalNotesStore = create<MedicalNotesStore>((set) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async (patientId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('medical_notes')
        .select(`
          *,
          users (
            name
          )
        `)
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const notesWithDoctorNames = data?.map(note => ({
        ...note,
        doctor_name: note.users?.name || 'Unknown Doctor'
      })) || [];

      set({ notes: notesWithDoctorNames, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addNote: async (note) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('medical_notes')
        .insert([note])
        .select(`
          *,
          users (
            name
          )
        `)
        .single();

      if (error) throw error;

      const noteWithDoctorName = {
        ...data,
        doctor_name: data.users?.name || 'Unknown Doctor'
      };

      set(state => ({
        notes: [noteWithDoctorName, ...state.notes],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  }
}));