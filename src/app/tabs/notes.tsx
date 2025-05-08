import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';

export default function NotesPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Notas</Text>

      <Link href="../notes/new" asChild>
        <TouchableOpacity style={styles.newNoteButton}>
          <Text style={styles.newNoteButtonText}>+ Criar Nova Nota</Text>
        </TouchableOpacity>
      </Link>

      <ScrollView style={styles.notesList} contentContainerStyle={{ paddingBottom: 20 }}>
        <Link href="../notes/edit" asChild>
          <TouchableOpacity style={styles.noteCard}>
            <Text style={styles.noteTitle}>📝 Nota Exemplo</Text>
            <Text style={styles.notePreview}>Este é um exemplo de nota no estilo Notion.</Text>
          </TouchableOpacity>
        </Link>
        {/* ...adicione mais cards de notas aqui... */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[800],
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: 'center', // centraliza o texto
  },
  newNoteButton: {
    backgroundColor: colors.blue[400], // mesma cor do botão salvar nota
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  newNoteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  notesList: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: colors.gray[600],
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 6,
  },
  notePreview: {
    fontSize: 14,
    color: colors.gray[300],
  },
});
