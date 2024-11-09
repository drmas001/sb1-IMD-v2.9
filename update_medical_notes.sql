-- Drop existing table and type
DROP TABLE IF EXISTS medical_notes CASCADE;
DROP TYPE IF EXISTS note_type CASCADE;

-- Create note_type enum
CREATE TYPE note_type AS ENUM (
    'Progress Note',
    'Follow-up Note',
    'Consultation Note',
    'Discharge Note',
    'Discharge Summary'
);

-- Create medical_notes table
CREATE TABLE medical_notes (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id),
    doctor_id INTEGER NOT NULL REFERENCES users(id),
    note_type note_type NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_medical_notes_patient_id ON medical_notes(patient_id);
CREATE INDEX idx_medical_notes_doctor_id ON medical_notes(doctor_id);
CREATE INDEX idx_medical_notes_type ON medical_notes(note_type);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_medical_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_medical_notes_updated_at
    BEFORE UPDATE ON medical_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_medical_notes_updated_at();