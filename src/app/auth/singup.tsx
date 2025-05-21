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

export default function singup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({visible: false, icon: '', iconColor: '', title: '', message: ''});

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
        // Supabase error codes: https://supabase.com/docs/reference/javascript/auth-signup#errors
        if (data.msg && data.msg.includes('password')) {
          showModal('password');
        } else if (data.msg && data.msg.includes('email')) {
          showModal('email');
        } else if (data.error && data.error === 'User already registered') {
          showModal('exists');
        } else if (data.error_description && data.error_description.toLowerCase().includes('email')) {
          showModal('email');
        } else if (data.error_description && data.error_description.toLowerCase().includes('password')) {
          showModal('password');
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
      setTimeout(() => router.replace('/auth/singin'), 2000);
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
        <InputField
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <InputField
          style={styles.input}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button
          title="Registrar"
          color={colors.blue[400]}
          onPress={handleSignUp}
        />
        <AuthSwitchLink onPress={() => router.replace('/auth/singin')}>
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
