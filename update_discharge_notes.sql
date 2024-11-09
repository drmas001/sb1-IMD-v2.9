-- Add discharge_note column to admissions table
ALTER TABLE admissions
ADD COLUMN discharge_note TEXT;

-- Create index for discharge notes
CREATE INDEX idx_admissions_discharge ON admissions(discharge_date)
WHERE discharge_date IS NOT NULL;