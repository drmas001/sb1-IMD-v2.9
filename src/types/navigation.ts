export type Page = 'dashboard' | 'admission' | 'patient' | 'consultation' | 'reports' | 'discharge' | 'specialties' | 'employees' | 'appointments' | 'profile';

export const isValidPage = (page: string): page is Page => {
  const validPages: Page[] = [
    'dashboard',
    'admission',
    'patient',
    'consultation',
    'reports',
    'discharge',
    'specialties',
    'employees',
    'appointments',
    'profile'
  ];
  return validPages.includes(page as Page);
};