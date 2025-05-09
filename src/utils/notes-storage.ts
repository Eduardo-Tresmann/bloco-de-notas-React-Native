import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

const NOTES_KEY = 'NOTES_V1';

export async function getNotes(): Promise<Note[]> {
  const json = await AsyncStorage.getItem(NOTES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveNote(note: Note): Promise<void> {
  const notes = await getNotes();
  const idx = notes.findIndex(n => n.id === note.id);
  if (idx >= 0) {
    notes[idx] = note;
  } else {
    notes.unshift(note);
  }
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function getNote(id: string): Promise<Note | undefined> {
  const notes = await getNotes();
  return notes.find(n => n.id === id);
}

export async function removeNote(id: string): Promise<void> {
  const notes = await getNotes();
  const filtered = notes.filter(n => n.id !== id);
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
}

