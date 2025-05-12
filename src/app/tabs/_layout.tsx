import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: 'document-text-outline' | 'settings-outline' =
            route.name === 'notes' ? 'document-text-outline' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          backgroundColor: colors.gray[800],
          borderTopColor: colors.gray[700],
        },
        headerStyle: {
          backgroundColor: colors.gray[800],
        },
        headerTitleStyle: {
          color: colors.white,
        },
      })}
    >
      <Tabs.Screen name="notes" options={{ title: 'Notas', headerShown: false }} />
      <Tabs.Screen name="settings" options={{ title: 'Configurações', headerShown: false }} />
    </Tabs>
  );
}

