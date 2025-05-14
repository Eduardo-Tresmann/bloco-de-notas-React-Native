import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: 'document-text-outline' | 'settings-outline' =
            route.name === 'notes' ? 'document-text-outline' : 'settings-outline';
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={focused ? { textShadowColor: colors.blue[400], textShadowRadius: 5, textShadowOffset: { width: 0, height: 0 } } : {}}
            />
          );
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          backgroundColor: colors.gray[800],
          borderTopWidth: 0.2,
          borderTopColor: colors.gray[600],
          elevation: 0,
          shadowOpacity: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
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

