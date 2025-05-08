import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚙️ Configurações</Text>
      <Text style={styles.text}>Futuras Configurações.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.gray[800],
    padding: 20,
    paddingTop: 20,
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
});
