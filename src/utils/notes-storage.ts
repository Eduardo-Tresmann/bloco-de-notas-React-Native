import AsyncStorage from '@react-native-async-storage/async-storage';
import { supaAnonKey, supaUrl } from '@/constants/supabase';

if (typeof atob === 'undefined') {
  global.atob = function (input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input.replace(/=+$/, '');
    let output = '';
    if (str.length % 4 === 1) {
      throw new Error('Invalid base64 string');
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  };
}

export type SupabaseNote = {
  id?: string;
  user_id: string;
  title: string;
  content: string;
  created_at?: string;
};

async function getUserToken() {
  const supabaseSession = await AsyncStorage.getItem('@supabase.auth.token');
  if (supabaseSession) {
    const sessionObj = JSON.parse(supabaseSession);
    return sessionObj.currentSession?.access_token || sessionObj.access_token || sessionObj.accessToken;
  }
  const legacySession = await AsyncStorage.getItem('supabase.auth.token');
  if (legacySession) {
    const sessionObj = JSON.parse(legacySession);
    return sessionObj.currentSession?.access_token || sessionObj.access_token || sessionObj.accessToken;
  }
  return null;
}

async function getUserId() {
  const token = await getUserToken();
  if (!token) return null;
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  return decoded.sub;
}

export async function saveNote(note: { title: string; content: string }): Promise<void> {
  const token = await getUserToken();
  const userId = await getUserId();
  if (!token || !userId) throw new Error('Usuário não autenticado');
  const response = await fetch(`${supaUrl}/rest/v1/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supaAnonKey,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      user_id: userId,
      title: note.title,
      content: note.content,
      created_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error('Erro ao salvar nota');
}

export async function getNotes(): Promise<SupabaseNote[]> {
  const token = await getUserToken();
  const userId = await getUserId();
  if (!token || !userId) throw new Error('Usuário não autenticado');
  const response = await fetch(`${supaUrl}/rest/v1/notes?user_id=eq.${userId}&order=created_at.desc`, {
    method: 'GET',
    headers: {
      apikey: supaAnonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao buscar notas');
  return await response.json();
}

export async function removeNote(id: string): Promise<void> {
  const token = await getUserToken();
  if (!token) throw new Error('Usuário não autenticado');
  const response = await fetch(`${supaUrl}/rest/v1/notes?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      apikey: supaAnonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao deletar nota');
}

export async function getNote(id: string): Promise<SupabaseNote | undefined> {
  const notes = await getNotes();
  return notes.find((n: any) => n.id === id);
}

export async function updateNote(id: string, note: { title: string; content: string }): Promise<void> {
  const token = await getUserToken();
  if (!token) throw new Error('Usuário não autenticado');
  const response = await fetch(`${supaUrl}/rest/v1/notes?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: supaAnonKey,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error('Erro ao atualizar nota');
}

