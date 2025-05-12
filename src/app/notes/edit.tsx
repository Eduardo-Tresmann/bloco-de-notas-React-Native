import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { colors } from '@/styles/colors';
import { getNote, saveNote, Note } from '../../utils/notes-storage';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (typeof id === 'string') {
        const note = await getNote(id);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSave = async () => {
    if (!id || typeof id !== 'string') return;
    await saveNote({
      id,
      title: title.trim() || 'Sem título',
      content: content.trim(),
      createdAt: Date.now(),
    });
    setSaved(true);
    setShowModal(true);
    setTimeout(() => {
      setSaved(false);
      setShowModal(false);
      router.push('../tabs/notes');
    }, 1500);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.gray[900], justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.blue[400]} size="large" />
      </View>
    );
  }

  return (
    <>
      <PageContainer style={styles.container} scrollable>
        <View style={styles.card}>
          <InputField
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
          <InputField
            placeholder="Digite o conteúdo da nota..."
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.contentInput}
          />
          <Button
            title="Salvar Nota"
            color={colors.blue[400]}
            style={styles.saveButton}
            onPress={handleSave}
          />
        </View>
      </PageContainer>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black,
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

