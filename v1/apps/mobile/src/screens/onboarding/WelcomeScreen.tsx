import React from 'react';
import { ScreenContainer } from '../../components/ScreenContainer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RoboQoachLogo } from '../../components/RoboQoachLogo';
import { theme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

// v0 look and feel, no Quick Start button, only logo and welcome text

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handlePersonalizedSetup = () => {
    navigation.navigate('OnboardingProfile');
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
