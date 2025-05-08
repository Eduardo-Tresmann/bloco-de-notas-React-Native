import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import React from 'react';
import { colors } from '../../styles/colors';
import { saveNote, Note } from '../../utils/notes-storage';
import { Ionicons } from '@expo/vector-icons';

function uuid() {
  return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
}

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    const note: Note = {
      id: uuid(),
      title: title.trim() || 'Sem título',
      content: content.trim(),
      createdAt: Date.now(),
    };
    await saveNote(note);
    setSaved(true);
    setShowModal(true);
    setTimeout(() => {
      setSaved(false);
      setShowModal(false);
      router.push('../tabs/notes');
    }, 1500); // aumente o tempo para 2.2 segundos
  };

  return (
    <>
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
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar Nota</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={40} color={colors.green[400]} style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Nota salva!</Text>
            <Text style={styles.modalText}>Sua nota foi salva com sucesso.</Text>
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.gray[800],
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    width: 320,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    color: colors.gray[100],
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
});
