import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/colors';
import { supaAnonKey } from '@/constants/supabase';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import ModalMessage from '@/components/ModalMessage';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function Settings() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modal, setModal] = useState<{visible: boolean, icon: string, iconColor: string, title: string, message: string}>({visible: false, icon: '', iconColor: '', title: '', message: ''});
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmail() {
      const sessionStr = await AsyncStorage.getItem('@supabase.auth.token');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        const token = session.currentSession?.access_token || session.access_token || session.accessToken;
        if (token) {
          const payload = parseJwt(token);
          setUserEmail(payload?.email || null);
        }
      }
    }
    fetchEmail();
  }, []);

  function handleLogout() {
    router.replace('/auth/singin');
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

  async function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setModal({
        visible: true,
        icon: 'alert-circle-outline',
        iconColor: colors.yellow[400],
        title: 'Campos obrigatórios',
        message: 'Preencha todos os campos para trocar a senha.'
      });
      setTimeout(() => setModal(m => ({ ...m, visible: false })), 2200);
      return;
    }
    if (newPassword !== confirmPassword) {
      setModal({
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Senhas diferentes',
        message: 'A nova senha e a confirmação não coincidem.'
      });
      setTimeout(() => setModal(m => ({ ...m, visible: false })), 2200);
      return;
    }
    try {
      const verifyRes = await fetch('https://vprnwrnhqfztihaactav.supabase.co/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supaAnonKey,
        },
        body: JSON.stringify({
          email: userEmail,
          password: currentPassword,
        }),
      });
      if (!verifyRes.ok) {
        setModal({
          visible: true,
          icon: 'close-circle-outline',
          iconColor: colors.red[400],
          title: 'Senha atual incorreta',
          message: 'A senha atual informada está incorreta.'
        });
        setTimeout(() => setModal(m => ({ ...m, visible: false })), 2500);
        return;
      }
      const sessionStr = await AsyncStorage.getItem('@supabase.auth.token');
      if (!sessionStr) throw new Error('Usuário não autenticado');
      const session = JSON.parse(sessionStr);
      const token = session.currentSession?.access_token || session.access_token || session.accessToken;
      if (!token) throw new Error('Usuário não autenticado');
      const res = await fetch('https://vprnwrnhqfztihaactav.supabase.co/auth/v1/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supaAnonKey,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        let msg = 'Não foi possível trocar a senha.';
        if (data.msg && data.msg.toLowerCase().includes('password')) {
          msg = 'A senha deve ter pelo menos 6 caracteres.';
        }
        setModal({
          visible: true,
          icon: 'close-circle-outline',
          iconColor: colors.red[400],
          title: 'Erro ao trocar senha',
          message: msg
        });
        setTimeout(() => setModal(m => ({ ...m, visible: false })), 2500);
        return;
      }
      setModal({
        visible: true,
        icon: 'checkmark-circle-outline',
        iconColor: colors.green[400],
        title: 'Senha alterada!',
        message: 'Sua senha foi alterada com sucesso.'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setModal(m => ({ ...m, visible: false })), 2000);
    } catch (e: any) {
      setModal({
        visible: true,
        icon: 'close-circle-outline',
        iconColor: colors.red[400],
        title: 'Erro ao trocar senha',
        message: e.message || 'Não foi possível trocar a senha.'
      });
      setTimeout(() => setModal(m => ({ ...m, visible: false })), 2500);
    }
  }

  return (
    <>
      <PageContainer style={styles.container}>
        <Header style={styles.header}>Configurações</Header>
        {userEmail && (
          <View style={styles.userLabelContainer}>
            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Text style={styles.userLabelText}>Usuario logado</Text>
              <Text style={styles.userLabelEmail}>{userEmail}</Text>
            </View>
          </View>
        )}
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
  userLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[700],
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 16,
    alignSelf: 'stretch',
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    gap: 8,
  },
  userLabelText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center', 
    marginBottom: 2,
  },
  userLabelEmail: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});