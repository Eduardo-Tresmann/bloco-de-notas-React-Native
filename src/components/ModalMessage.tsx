import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';

interface ModalMessageProps {
  visible: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  message: string;
  warn?: string;
  actions?: React.ReactNode;
  onRequestClose?: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({
  visible,
  icon,
  iconColor,
  title,
  message,
  warn,
  actions,
  onRequestClose,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onRequestClose}
  >
    <View style={styles.overlay}>
      <View style={styles.content}>
        {icon && (
          <Ionicons name={icon} size={40} color={iconColor || colors.blue[400]} style={{ marginBottom: 12 }} />
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{message}</Text>
        {warn && <Text style={styles.warn}>{warn}</Text>}
        {actions && <View style={styles.actions}>{actions}</View>}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
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
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: colors.gray[100],
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  warn: {
    color: colors.red[400],
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 18,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
});

export default ModalMessage;
