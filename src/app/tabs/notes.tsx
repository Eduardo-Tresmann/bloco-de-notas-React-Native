import React, { useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, Animated, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '@/styles/colors';
import { getNotes, Note, removeNote } from '@/utils/notes-storage';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import NoteCard from '@/components/NoteCard';
import ModalMessage from '@/components/ModalMessage';
import Header from '@/components/Header';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [iconAnim] = useState<{ [id: string]: Animated.Value }>({});
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const loadNotes = async () => {
    setRefreshing(true);
    setNotes(await getNotes());
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setPendingDeleteId(id);
    setShowModal(true);
    if (!iconAnim[id]) {
      iconAnim[id] = new Animated.Value(1);
    }
    Animated.sequence([
      Animated.timing(iconAnim[id], { toValue: 1.2, duration: 120, useNativeDriver: true }),
      Animated.timing(iconAnim[id], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const confirmDelete = async () => {
    if (pendingDeleteId) {
      await removeNote(pendingDeleteId);
      setDeletingId(null);
      setPendingDeleteId(null);
      setShowModal(false);
      loadNotes();
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
    setPendingDeleteId(null);
    setShowModal(false);
  };

  return (
    <PageContainer
      style={{ backgroundColor: colors.gray[800], paddingHorizontal: 16, padding: 20, paddingBottom: 20 }}
      scrollable={false}
    >
      <Header>📝 Minhas Notas</Header>
      <Link href="../notes/new" asChild>
        <Button
          title="+ Criar Nova Nota"
          color={colors.blue[400]}
          style={styles.newNoteButton}
          onPress={() => {}}
        />
      </Link>
      <ScrollView
        style={styles.notesList}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadNotes} />}
      >
        {notes.length === 0 && (
          <Text style={{ color: colors.gray[400], textAlign: 'center', marginTop: 32 }}>Nenhuma nota criada ainda.</Text>
        )}
        {notes.map(note => (
          <Link key={note.id} href={{ pathname: '../notes/edit', params: { id: note.id } }} asChild>
            <NoteCard
              title={note.title}
              content={note.content}
              onPress={() => {}}
              onDelete={() => handleDelete(note.id)}
              deleting={deletingId === note.id}
              animValue={iconAnim[note.id]}
            />
          </Link>
        ))}
      </ScrollView>
      <ModalMessage
        visible={showModal}
        icon="trash-outline"
        iconColor={colors.red[400]}
        title="Excluir Nota"
        message="Tem certeza que deseja excluir esta nota?"
        warn="Esta ação não poderá ser desfeita."
        onRequestClose={cancelDelete}
        actions={
          <>
            <Button
              title="Cancelar"
              color={colors.gray[700]}
              style={styles.modalCancel}
              onPress={cancelDelete}
            />
            <Button
              title="Excluir"
              color={colors.red[600]}
              style={styles.modalDelete}
              onPress={confirmDelete}
            />
          </>
        }
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[800],
    paddingHorizontal: 16,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  newNoteButton: {
    backgroundColor: colors.blue[400],
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
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    position: 'relative',
    justifyContent: 'center',
  },
  trashButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: 0,
    padding: 6,
    borderRadius: 8,
    zIndex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
  modalWarn: {
    color: colors.red[400],
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 18,
  },
  modalActionsFixed: {
    flexDirection: 'row',
  },
  modalCancel: {
    backgroundColor: colors.gray[700],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginRight: 16,
  },
  modalCancelText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  modalDelete: {
    backgroundColor: colors.red[600],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  modalDeleteText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  }
});
