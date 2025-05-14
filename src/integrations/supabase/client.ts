// This file handles the Supabase client initialization with environment variables
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
} else {
  console.log('Supabase client initialized successfully');
}

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);