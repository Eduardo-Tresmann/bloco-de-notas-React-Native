import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function NoteDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Nota {id}</Text>
      <Text style={{ marginTop: 10 }}>Nota existente...</Text>
    </View>
  );
}
