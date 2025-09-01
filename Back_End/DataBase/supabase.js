import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // Load .env in local development

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Missing Supabase environment variables. Check SUPABASE_URL and SUPABASE_ANON_KEY.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
