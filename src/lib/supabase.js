import { createClient } from '@supabase/supabase-js'

// Usamos fallbacks para evitar que a aplicação quebre (tela branca)
// caso as variáveis de ambiente não sejam carregadas no build do GH Pages
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

