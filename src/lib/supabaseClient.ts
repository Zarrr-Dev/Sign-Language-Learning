import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

declare global {

  var __supabaseInstance: SupabaseClient | undefined
}

export const supabase =
  globalThis.__supabaseInstance ||
  (globalThis.__supabaseInstance = createClient(supabaseUrl, supabaseAnonKey))