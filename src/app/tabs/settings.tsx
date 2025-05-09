import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  function handleLogout() {
    router.replace('/auth/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚙️ Configurações</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
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
    fontSize: 24,
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
    backgroundColor: colors.red[400],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

