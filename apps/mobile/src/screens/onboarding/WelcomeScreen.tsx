import React from 'react';
import { ScreenContainer } from '../../components/ScreenContainer';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleQuickSetup = () => {
    navigation.navigate('Setup');
  };

  const handlePersonalizedSetup = () => {
    navigation.navigate('OnboardingGoals');
  };

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏋️‍♂️</Text>
            <Text style={styles.logoRobot}>🤖</Text>
          </View>
          <Text style={styles.title}>
            RoboQ<Text style={styles.titleAI}>oach</Text>
          </Text>
          <Text style={styles.subtitle}>Your Personal AI Trainer</Text>
        </View>
        
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Get real-time form analysis and personalized workouts powered by AI
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>💪</Text>
            <Text style={styles.featureText}>Smart workout generation</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <Text style={styles.featureText}>Real-time form feedback</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>📊</Text>
            <Text style={styles.featureText}>Track your progress</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePersonalizedSetup}>
            <Text style={styles.primaryButtonText}>Personalized Setup 🎯</Text>
            <Text style={styles.buttonSubtext}>Get AI-optimized workouts (2 min)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleQuickSetup}>
            <Text style={styles.secondaryButtonText}>Quick Start ⚡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  logoIcon: {
    fontSize: 40,
    marginRight: 8,
  },
  logoRobot: {
    fontSize: 35,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  titleAI: {
    color: '#00D4FF',
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    fontWeight: '500',
  },
  description: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 17,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderLeftWidth: 4,
    borderLeftColor: '#00D4FF',
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 14,
  },
  featureText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00D4FF',
  },
  secondaryButtonText: {
    color: '#00D4FF',
    fontSize: 17,
    fontWeight: '600',
  },
});