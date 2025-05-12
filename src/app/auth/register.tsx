import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import Header from '@/components/Header';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  function handleRegister() {
    router.replace('/auth/login');
  }

  return (
    <PageContainer style={styles.container}>
      <Header>Registrar</Header>
      <InputField
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <InputField
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        title="Registrar"
        color={colors.blue[400]}
        style={styles.button}
        onPress={handleRegister}
      />
      <AuthSwitchLink onPress={() => router.replace('/auth/login')}>
        Já tem conta? Faça login
      </AuthSwitchLink>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[800],
    padding: 24,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.gray[700],
    color: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.blue[400],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
});
