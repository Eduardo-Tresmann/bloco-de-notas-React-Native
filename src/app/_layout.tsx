import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { colors } from '../styles/colors';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[800], paddingTop: insets.top }}>
      <StatusBar style="light" />
      <Slot />
    </View>
  );
}

