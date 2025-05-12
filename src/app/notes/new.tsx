import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import { saveNote } from '../../utils/notes-storage';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import ModalMessage from '@/components/ModalMessage';
import Header from '@/components/Header';

function uuid() {
  return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
}

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    const note = {
      id: uuid(),
      title: title.trim() || 'Sem título',
      content: content.trim(),
      createdAt: Date.now(),
    };
    await saveNote(note);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push('../tabs/notes');
    }, 1500);
  };

  return (
    <>
      <PageContainer style={styles.container} scrollable>
        <Header>Nova Nota</Header>
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
      </PageContainer>
      <ModalMessage
        visible={showModal}
        icon="checkmark-circle-outline"
        iconColor={colors.green[400]}
        title="Nota salva!"
        message="Sua nota foi salva com sucesso."
        onRequestClose={() => setShowModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.gray[900],
    padding: 20,
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
});

