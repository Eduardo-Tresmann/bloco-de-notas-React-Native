import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { saveNote } from '@/utils/notes-storage';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import ModalMessage from '@/components/ModalMessage';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

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
    setSaving(true);
    try {
      await saveNote({ title, content });
      setErrorMsg('');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.replace('/tabs/notes');
      }, 1500);
    } catch (e) {
      setErrorMsg('Erro ao salvar nota. Tente novamente.');
      setShowModal(true);
    }
    setSaving(false);
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
        style={[
          styles.saveButton,
          saving && { opacity: 0.6 },
          { marginBottom: 20 + insets.bottom }
        ]}
        onPress={handleSave}
        disabled={saving}
      />
      <ModalMessage
        visible={showModal}
        icon={errorMsg ? 'alert-circle-outline' : 'checkmark-circle-outline'}
        iconColor={errorMsg ? colors.red[400] : colors.green[400]}
        title={errorMsg ? 'Erro' : 'Nota salva!'}
        message={errorMsg ? errorMsg : 'Sua nota foi salva com sucesso.'}
        onRequestClose={() => {
          setShowModal(false);
          setErrorMsg('');
        }}
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
    margin: 20,
  },
  saveButtonBottom: {
    margin: 20,
    marginTop: 0,
    paddingHorizontal: 16,
  },
});
