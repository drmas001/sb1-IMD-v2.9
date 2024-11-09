import { useCallback } from 'react';

export const useNavigate = () => {
  const goBack = useCallback(() => {
    // Since we're not using a router, this simulates going back
    // You can replace this with actual routing logic if needed
    window.history.back();
  }, []);

  return { goBack };
};