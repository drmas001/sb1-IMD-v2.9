import { useEffect, useState } from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import { useConsultationStore } from '../stores/useConsultationStore';

export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { fetchPatients } = usePatientStore();
  const { fetchConsultations } = useConsultationStore();

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchPatients(),
          fetchConsultations()
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [fetchPatients, fetchConsultations]);

  return { isLoading, error };
};