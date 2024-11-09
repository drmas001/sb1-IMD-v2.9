import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://ejnvatnqxbzredbtcdhb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbnZhdG5xeGJ6cmVkYnRjZGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4Mzc4NDcsImV4cCI6MjA0NjQxMzg0N30.F1GtaKJ75sEMH7VMMWvlNkbOvzJDjlUX5TyLrIX9BNo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'imd-care'
    }
  }
});