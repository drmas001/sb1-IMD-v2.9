export interface Database {
  public: {
    Tables: {
      medical_notes: {
        Row: {
          id: number;
          patient_id: number;
          doctor_id: number;
          note_type: 'Progress Note' | 'Follow-up Note' | 'Consultation Note' | 'Discharge Note' | 'Discharge Summary';
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          patient_id: number;
          doctor_id: number;
          note_type: 'Progress Note' | 'Follow-up Note' | 'Consultation Note' | 'Discharge Note' | 'Discharge Summary';
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          patient_id?: number;
          doctor_id?: number;
          note_type?: 'Progress Note' | 'Follow-up Note' | 'Consultation Note' | 'Discharge Note' | 'Discharge Summary';
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      admissions: {
        Row: {
          id: number;
          patient_id: number;
          admission_date: string;
          discharge_date: string | null;
          department: string;
          admitting_doctor_id: number;
          diagnosis: string;
          status: 'active' | 'discharged' | 'transferred';
          safety_type: 'emergency' | 'observation' | 'short-stay' | null;
          visit_number: number;
        };
        Insert: {
          id?: number;
          patient_id: number;
          admission_date: string;
          discharge_date?: string | null;
          department: string;
          admitting_doctor_id: number;
          diagnosis: string;
          status: 'active' | 'discharged' | 'transferred';
          safety_type?: 'emergency' | 'observation' | 'short-stay' | null;
          visit_number?: number;
        };
        Update: {
          id?: number;
          patient_id?: number;
          admission_date?: string;
          discharge_date?: string | null;
          department?: string;
          admitting_doctor_id?: number;
          diagnosis?: string;
          status?: 'active' | 'discharged' | 'transferred';
          safety_type?: 'emergency' | 'observation' | 'short-stay' | null;
          visit_number?: number;
        };
      };
    };
  };
}