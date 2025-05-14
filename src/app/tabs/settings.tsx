import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import ModalMessage from '@/components/ModalMessage';

export default function Settings() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modal, setModal] = useState<{visible: boolean, icon: string, iconColor: string, title: string, message: string}>({visible: false, icon: '', iconColor: '', title: '', message: ''});

  function handleLogout() {
    router.replace('/auth/login');
  }

  function showModal(type: 'success' | 'empty' | 'mismatch') {
    let modalConfig;
    if (type === 'empty') {
      modalConfig = {
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Campos obrigatórios',
        message: 'Preencha todos os campos para trocar a senha.'
      };
    } else if (type === 'mismatch') {
      modalConfig = {
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Senhas diferentes',
        message: 'A nova senha e a confirmação não coincidem.'
      };
    } else {
      modalConfig = {
        visible: true,
        icon: 'checkmark-circle-outline',
        iconColor: colors.green[400],
        title: 'Senha alterada!',
        message: 'Sua senha foi alterada com sucesso.'
      };
    }
    setModal(modalConfig);
    setTimeout(() => setModal(m => ({ ...m, visible: false })), 2000);
  }

  function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showModal('empty');
      return;
    }
    if (newPassword !== confirmPassword) {
      showModal('mismatch');
      return;
    }
    showModal('success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <>
      <PageContainer style={styles.container}>
        <Header style={styles.header}>Configurações</Header>
        <InputField
          placeholder="Senha atual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          style={styles.input}
        />
        <InputField
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
        />
        <InputField
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          title="Trocar Senha"
          color={colors.blue[400]}
          style={styles.changePasswordButton}
          onPress={handleChangePassword}
        />
        <Button
          title="Sair da Conta"
          color={colors.red[400]}
          style={styles.logoutButton}
          onPress={handleLogout}
        />
      </PageContainer>
      <ModalMessage
        visible={modal.visible}
        icon={modal.icon as any}
        iconColor={modal.iconColor}
        title={modal.title}
        message={modal.message}
        onRequestClose={() => setModal(m => ({...m, visible: false}))}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[800],
    padding: 20,
    justifyContent: 'flex-start',
    gap: 10,
  },
  header: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  logoutButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  input: {
    marginBottom: 12,
  },
  changePasswordButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.blue[400],
  },
  message: {
    color: colors.blue[400],
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});

