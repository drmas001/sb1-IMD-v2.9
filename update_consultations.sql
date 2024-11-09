-- Drop existing consultations table if it exists
DROP TABLE IF EXISTS consultations;

-- Create consultations table with updated schema
CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id),
    mrn VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    requesting_department VARCHAR(255) NOT NULL,
    patient_location VARCHAR(255) NOT NULL,
    consultation_specialty VARCHAR(255) NOT NULL,
    shift_type VARCHAR(10) CHECK (shift_type IN ('morning', 'evening', 'night')),
    urgency VARCHAR(10) CHECK (urgency IN ('routine', 'urgent', 'emergency')),
    reason TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'completed', 'cancelled')),
    doctor_id INTEGER REFERENCES users(id),
    doctor_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by INTEGER REFERENCES users(id),
    completion_note TEXT,
    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_mrn ON consultations(mrn);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX idx_consultations_completed_by ON consultations(completed_by) WHERE completed_by IS NOT NULL;
CREATE INDEX idx_consultations_completed_at ON consultations(completed_at) WHERE completed_at IS NOT NULL;

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();