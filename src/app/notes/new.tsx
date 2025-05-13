import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import { saveNote } from '../../utils/notes-storage';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import ModalMessage from '@/components/ModalMessage';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

function uuid() {
  return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
}

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleBackPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };
  const handleBackPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

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
        <Animated.View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => router.push('../tabs/notes')}
            onPressIn={handleBackPressIn}
            onPressOut={handleBackPressOut}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Header style={styles.headerTitleCentered}>Nova Nota</Header>
        </Animated.View>
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
          scrollEnabled={true}
        />
      </PageContainer>
      <Button
        title="Salvar Nota"
        color={colors.blue[400]}
        style={[styles.saveButton, styles.saveButtonBottom]}
        onPress={handleSave}
      />
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
    backgroundColor: colors.gray[800],
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 4,
    position: 'relative',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 4,
    marginRight: 12,
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  headerTitleCentered: {
    flex: 1,
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 26,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    backgroundColor: colors.gray[800],
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 2, 
    borderWidth: 0,
  },
  contentInput: {
    minHeight: 120,
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.gray[800],
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 0,
    textAlignVertical: 'top',
    lineHeight: 22,
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
  saveButtonBottom: {
    margin: 20,
    marginTop: 0,
    paddingHorizontal: 16,
  },
});

