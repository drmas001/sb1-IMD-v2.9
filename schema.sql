-- Update note_type enum to include Discharge Note
ALTER TYPE note_type DROP VALUE IF EXISTS 'Discharge Note';
ALTER TYPE note_type ADD VALUE 'Discharge Note' AFTER 'Consultation Note';