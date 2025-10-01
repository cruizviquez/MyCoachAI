import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../assets/theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RoboQoach</Text>
      <Text style={styles.subtitle}>Your AI Fitness Coach</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 18,
    marginBottom: 32,
  },
});
