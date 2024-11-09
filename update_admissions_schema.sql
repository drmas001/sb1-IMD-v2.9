-- Add safety_type enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'safety_type') THEN
        CREATE TYPE safety_type AS ENUM ('emergency', 'observation', 'short-stay');
    END IF;
END $$;

-- Add safety_type column to admissions table if it doesn't exist
ALTER TABLE admissions
ADD COLUMN IF NOT EXISTS safety_type safety_type;

-- Add visit_number column to admissions table if it doesn't exist
ALTER TABLE admissions
ADD COLUMN IF NOT EXISTS visit_number INTEGER NOT NULL DEFAULT 1;

-- Create index for safety type
CREATE INDEX IF NOT EXISTS idx_admissions_safety_type 
ON admissions(safety_type) 
WHERE safety_type IS NOT NULL;

-- Create index for visit number
CREATE INDEX IF NOT EXISTS idx_admissions_visit_number 
ON admissions(patient_id, visit_number);

-- Remove unique constraint on patients.mrn if it exists
ALTER TABLE patients
DROP CONSTRAINT IF EXISTS patients_mrn_key;

-- Add non-unique index on mrn for faster lookups
CREATE INDEX IF NOT EXISTS idx_patients_mrn 
ON patients(mrn);

-- Update view to include safety type and visit number
DROP VIEW IF EXISTS active_admissions;
CREATE VIEW active_admissions AS
SELECT 
    a.id,
    a.patient_id,
    p.mrn,
    p.name,
    a.admission_date,
    a.department,
    a.safety_type::text as safety_type,
    u.name as doctor_name,
    a.diagnosis,
    a.status,
    a.visit_number
FROM 
    admissions a
    JOIN patients p ON a.patient_id = p.id
    LEFT JOIN users u ON a.admitting_doctor_id = u.id
WHERE 
    a.status = 'active';