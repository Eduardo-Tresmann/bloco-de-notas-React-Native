import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { supaAnonKey, supaUrl } from '@/constants/supabase'

const supabaseUrl = supaUrl           //coloque sua URL do Supabase aqui
const supabaseAnonKey = supaAnonKey   //coloque sua chave anonima do Supabase aqui

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Informa ao Supabase Auth para atualizar continuamente a sessão automaticamente
// se o aplicativo estiver em primeiro plano. Quando isso é adicionado, você continuará
// recebendo eventos `onAuthStateChange` com os eventos `TOKEN_REFRESHED` ou
// `SIGNED_OUT` se a sessão do usuário for encerrada. Isso deve
// ser registrado apenas uma vez.

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})