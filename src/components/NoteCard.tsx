import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface NoteCardProps {
  title: string;
  content: string;
  onPress?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
  animValue?: Animated.Value;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onPress, onDelete, deleting, animValue }) => (
  <TouchableOpacity style={styles.noteCard} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.noteTitle} numberOfLines={1}>{title}</Text>
    <Text style={styles.notePreview} numberOfLines={2}>{content}</Text>
    <TouchableOpacity
      style={styles.trashButton}
      onPress={e => {
        e.stopPropagation();
        onDelete && onDelete();
      }}
      accessibilityLabel="Excluir nota"
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale: animValue || 1 }] }}>
        <Ionicons
          name="trash-outline"
          size={22}
          color={deleting ? colors.red[400] : colors.gray[300]}
        />
      </Animated.View>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: colors.gray[700],
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
    minHeight: 70,
    justifyContent: 'center',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 6,
    paddingRight: 30,
    flexShrink: 1,
  },
  notePreview: {
    fontSize: 14,
    color: colors.gray[300],
    paddingRight: 30,
    flexShrink: 1,
    height: 40,
    overflow: 'hidden',
  },
  trashButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    padding: 6,
    borderRadius: 8,
    zIndex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteCard;
