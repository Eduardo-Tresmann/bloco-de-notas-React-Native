import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import Header from '@/components/Header';

export default function Settings() {
  const router = useRouter();

  function handleLogout() {
    router.replace('/auth/login');
  }

  return (
    <PageContainer style={styles.container}>
      <Header>⚙️ Configurações</Header>
      <Button
        title="Sair da Conta"
        color={colors.red[400]}
        style={styles.logoutButton}
        onPress={handleLogout}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[800],
    padding: 20,
  },
  logoutButton: {
    marginTop: 32,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
});

