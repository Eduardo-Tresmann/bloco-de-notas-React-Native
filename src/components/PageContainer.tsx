import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '@/styles/colors';

interface PageContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: any;
}

export default function PageContainer({ children, style, ...props }: PageContainerProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
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
    width: '100%',
  },
});
