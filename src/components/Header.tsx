import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { colors } from '@/styles/colors';

interface HeaderProps extends TextProps {
  children: React.ReactNode;
  style?: any;
}

const Header: React.FC<HeaderProps> = ({ children, style, ...rest }) => (
  <Text style={[styles.header, style]} {...rest}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default Header;
