import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import Header from '@/components/Header';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    router.replace('/tabs/notes');
  }

  return (
    <PageContainer style={styles.container}>
      <Header>Login</Header>
      <InputField
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Entrar"
        color={colors.blue[400]}
        onPress={handleSignIn}
      />
      <AuthSwitchLink onPress={() => router.push('/auth/register')}>
        Não tem conta? Registre-se
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
});
