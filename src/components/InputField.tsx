import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/styles/colors';

interface InputFieldProps extends TextInputProps {
  style?: any;
}

export default function InputField({ style, ...props }: InputFieldProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.gray[400]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: colors.gray[700],
    color: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
