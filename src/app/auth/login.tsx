import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Pressable } from 'react-native';
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));
  const router = useRouter();

  function handleLogin() {
    router.replace('/tabs/notes');
  }

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor={colors.gray[400]}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.gray[400]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Entrar"
        color={colors.blue[400]}
        style={styles.button}
        onPress={handleLogin}
      />
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.switchText}>Não tem conta? Registre-se</Text>
        </Pressable>
      </Animated.View>
    </View>
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
  title: {
    fontSize: 28,
    color: colors.white,
    marginBottom: 32,
    fontWeight: 'bold',
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
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: colors.gray[300],
    fontSize: 16,
    marginTop: 8,
  },
});
