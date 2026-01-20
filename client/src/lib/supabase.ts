import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvcdxrosyzznbxofzdhy.supabase.co'
const supabaseAnonKey = 'sb_publishable_XthIM1kc5frfP9ViJg_oQg_hx70rAO5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
