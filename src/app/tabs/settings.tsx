import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function Settings() {
  const router = useRouter();

  function handleLogout() {
    router.replace('/auth/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚙️ Configurações</Text>
      <View style={{ flex: 1 }} />
      <Button
        title="Sair da Conta"
        color={colors.red[400]}
        style={styles.logoutButton}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray[800],
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: colors.gray[100],
    fontSize: 16,
    paddingTop: 10,
  },
  logoutButton: {
    marginTop: 32,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
});

