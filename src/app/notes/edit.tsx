import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState(`Nota ${id}`);
  const [content, setContent] = useState('Nota existente...');
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const saveNote = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push('../tabs/notes');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={24}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <TextInput
            placeholder="Título"
            placeholderTextColor={colors.gray[400]}
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
          <TextInput
            placeholder="Digite o conteúdo da nota..."
            placeholderTextColor={colors.gray[400]}
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.contentInput}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
            <Text style={styles.saveButtonText}>Salvar Nota</Text>
          </TouchableOpacity>
          {saved && (
            <Text style={styles.savedText}>Nota salva!</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[900],
    padding: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.gray[800],
    borderRadius: 0,
    padding: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minHeight: '100%',
    justifyContent: 'flex-start',
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    backgroundColor: colors.gray[700],
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 0,
  },
  contentInput: {
    minHeight: 120,
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.gray[600],
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 0,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.blue[400],
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  savedText: {
    color: colors.green[400],
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
});
