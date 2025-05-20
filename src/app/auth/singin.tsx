import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { supaAnonKey, supaUrl } from '@/constants/supabase';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import Header from '@/components/Header';
import ModalMessage from '@/components/ModalMessage';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({visible: false, icon: '', iconColor: '', title: '', message: ''});

  function showModal(type: 'success' | 'invalid') {
    let modalConfig;
    if (type === 'invalid') {
      modalConfig = {
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Credenciais inválidas',
        message: 'Email ou senha incorretos.'
      };
    } else {
      modalConfig = {
        visible: true,
        icon: 'checkmark-circle-outline',
        iconColor: colors.green[400],
        title: 'Login realizado!',
        message: 'Bem-vindo de volta!'
      };
    }
    setModal(modalConfig);
    setTimeout(() => setModal(m => ({ ...m, visible: false })), 2000);
  }

  async function handleSignIn() {
    if (!email || !password) {
      showModal('invalid');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${supaUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supaAnonKey,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        showModal('invalid');
        setLoading(false);
        return;
      }
      showModal('success');
      setLoading(false);
      setTimeout(() => router.replace('/tabs/notes'), 2000);
    } catch (error) {
      showModal('invalid');
      setLoading(false);
    }
  }

  return (
    <>
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
        <AuthSwitchLink onPress={() => router.push('/auth/singup')}>
          Não tem conta? Registre-se
        </AuthSwitchLink>
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
