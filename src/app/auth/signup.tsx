import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { supaAnonKey, supaUrl } from '@/constants/supabase';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import PageContainer from '@/components/PageContainer';
import AuthSwitchLink from '@/components/AuthSwitchLink';
import Header from '@/components/Header';
import ModalMessage from '@/components/ModalMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordField from '@/components/PasswordField';

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({visible: false, icon: '', iconColor: '', title: '', message: ''});

  function isValidEmail(email: string) {
    return /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com|live\.com|bol\.com\.br|uol\.com\.br|terra\.com\.br)$/i.test(email);
  }

  function showModal(type: 'success' | 'network' | 'email' | 'password' | 'exists' | 'mismatch' | 'empty') {
    let modalConfig;
    if (type === 'empty') {
      modalConfig = {
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Campos obrigatórios',
        message: 'Preencha todos os campos para registrar.'
      };
    } else if (type === 'mismatch') {
      modalConfig = {
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Senhas diferentes',
        message: 'A confirmação de senha não coincide.'
      };
    } else if (type === 'email') {
      modalConfig = {
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Email inválido',
        message: 'Informe um email válido.'
      };
    } else if (type === 'password') {
      modalConfig = {
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Senha inválida',
        message: 'A senha deve ter pelo menos 6 caracteres.'
      };
    } else if (type === 'exists') {
      modalConfig = {
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Conta já existe',
        message: 'Já existe uma conta com este email.'
      };
    } else if (type === 'network') {
      modalConfig = {
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Erro de conexão',
        message: 'Não foi possível conectar. Tente novamente.'
      };
    } else {
      modalConfig = {
        visible: true,
        icon: 'checkmark-circle-outline',
        iconColor: colors.green[400],
        title: 'Cadastro realizado!',
        message: 'Sua conta foi criada com sucesso.'
      };
    }
    setModal(modalConfig);
    setTimeout(() => setModal(m => ({ ...m, visible: false })), 2000);
  }

  async function handleSignUp() {
    if (!email || !password || !confirmPassword) {
      showModal('empty');
      return;
    }
    if (!isValidEmail(email)) {
      showModal('email');
      return;
    }
    if (password !== confirmPassword) {
      showModal('mismatch');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${supaUrl}/auth/v1/signup`, {
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
        if (
          (data.error_description && data.error_description.toLowerCase().includes('password')) ||
          (data.msg && data.msg.toLowerCase().includes('password'))
        ) {
          showModal('password');
        } else if (
          (data.error_description && data.error_description.toLowerCase().includes('email')) ||
          (data.msg && data.msg.toLowerCase().includes('email'))
        ) {
          showModal('email');
        } else if (data.error && data.error === 'User already registered') {
          showModal('exists');
        } else if (data.msg && data.msg.toLowerCase().includes('already registered')) {
          showModal('exists');
        } else {
          showModal('email');
        }
        setLoading(false);
        return;
      }
      showModal('success');
      setLoading(false);
      if (data.access_token) {
        await AsyncStorage.setItem('sb-access-token', data.access_token);
      }
      setTimeout(() => router.replace('/auth/signin'), 2000);
    } catch (error) {
      showModal('network');
      setLoading(false);
    }
  }

  return (
    <>
      <PageContainer style={styles.container}>
        <Header>Registrar</Header>
        <InputField
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <PasswordField
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          style={styles.input}
          containerStyle={{ maxWidth: 320, width: '100%' }}
        />
        <PasswordField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirmar senha"
          style={styles.input}
          containerStyle={{ maxWidth: 320, width: '100%' }}
        />
        <Button
          title="Registrar"
          color={colors.blue[400]}
          onPress={handleSignUp}
        />
        <AuthSwitchLink onPress={() => router.replace('/auth/signin')}>
          Já tem conta? Faça login
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
