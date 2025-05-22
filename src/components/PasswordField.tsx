import React, { useState } from 'react';
import { View } from 'react-native';
import InputField from './InputField';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface PasswordFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  containerStyle?: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChangeText, placeholder = 'Senha', style, containerStyle }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[{ width: '100%', position: 'relative', marginBottom: 16 }, containerStyle]}>
      <InputField
        style={[style, { marginBottom: 0 }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <Ionicons
        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
        size={22}
        color={colors.gray[400]}
        style={{ position: 'absolute', right: 16, top: '50%', marginTop: -11 }}
        onPress={() => setShowPassword(v => !v)}
      />
    </View>
  );
};

export default PasswordField;
