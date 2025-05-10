import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Pressable } from 'react-native';
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));
  const router = useRouter();

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

  function handleRegister() {
    router.replace('/auth/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor={colors.gray[400]}
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
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.replace('/auth/login')}
        >
          <Text style={styles.switchText}>Já tem conta? Faça login</Text>
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
