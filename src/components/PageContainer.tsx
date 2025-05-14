import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, ViewProps } from 'react-native';
import { colors } from '@/constants/colors';

interface PageContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, scrollable = false, style, ...rest }) => {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { contentContainerStyle: [styles.content, style], keyboardShouldPersistTaps: 'handled' as const }
    : { style: [styles.content, style] };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={24}
      {...rest}
    >
      <Container {...containerProps}>
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray[900],
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
});

export default PageContainer;
