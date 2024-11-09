import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseStorage = createClient(supabaseUrl, supabaseKey).storage;

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabaseStorage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};