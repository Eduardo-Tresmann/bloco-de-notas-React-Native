import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function NotesPage() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Minhas Notas</Text>

      <Link href="../notes/new" asChild>
        <Button title="Criar Nova Nota" />
      </Link>

      <Link href="../notes/edit" style={{ marginTop: 20 }}>
        <Text style={{ marginTop: 20 }}>📝 Nota Exemplo</Text>
      </Link>
    </View>
  );
}
