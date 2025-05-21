import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import Header from '@/components/Header';
import ModalMessage from '@/components/ModalMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supaAnonKey, supaUrl } from '@/constants/supabase';

export default function Settings() {
  const router = useRouter();

  const [modal, setModal] = useState<{visible: boolean, icon: string, iconColor: string, title: string, message: string}>({visible: false, icon: '', iconColor: '', title: '', message: ''});

  function handleLogout() {
    router.replace('/auth/singin');
  }

  return (
    <>
      <PageContainer style={styles.container}>
        <Header style={styles.header}>Configurações</Header>
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
    justifyContent: 'space-between',
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
});

