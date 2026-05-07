// src/libs/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('As credenciais do Supabase estão a faltar no .env.local!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);