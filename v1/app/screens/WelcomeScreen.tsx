
import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from './ScreenContainer';
import { RoboQoachLogo } from './RoboQoachLogo';
import { theme } from './theme';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handlePersonalizedSetup = () => {
    router.push('/GoalScreen');
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.content}>
        <View style={styles.logoHeader}>
          <RoboQoachLogo size={48} />
          <Text style={styles.title}>RoboQoach</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome to RoboQoach!</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handlePersonalizedSetup}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: theme.colors.background,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
