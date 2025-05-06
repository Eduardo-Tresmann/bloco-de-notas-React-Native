import { View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import React from 'react';

export default function NewNote() {
  const [text, setText] = useState('');
  const router = useRouter();

  const saveNote = () => {
    Alert.alert('Nota salva!', `Conteúdo: ${text}`);
    router.push('../tabs/notes');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite sua nota aqui..."
        value={text}
        onChangeText={setText}
        multiline
        style={{ height: 150, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Salvar Nota" onPress={saveNote} />
    </View>
  );
}
