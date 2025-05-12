import React, { useState } from 'react';
import { Animated, Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { colors } from '@/styles/colors';

interface AuthSwitchLinkProps {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: any;
}

const AuthSwitchLink: React.FC<AuthSwitchLinkProps> = ({ onPress, children, style }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

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

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {typeof children === 'string' ? (
          <Text style={styles.linkText}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: colors.gray[300],
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AuthSwitchLink;
