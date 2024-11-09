import { format, isValid, parseISO } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Invalid Date';
    return format(parsedDate, 'dd/MM/yyyy');
  } catch {
    return 'Invalid Date';
  }
};

export const formatShortDate = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Invalid Date';
    return format(parsedDate, 'dd/MM/yyyy');
  } catch {
    return 'Invalid Date';
  }
};

export const formatTime = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Invalid Date';
    return format(parsedDate, 'h:mm a');
  } catch {
    return 'Invalid Date';
  }
};