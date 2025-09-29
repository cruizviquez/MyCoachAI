import React from 'react';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏋️‍♂️</Text>
            <Text style={styles.logoRobot}>🤖</Text>
          </View>
          <Text style={styles.title}>
            MyCoach<Text style={styles.titleAI}>AI</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    color: '#1a202c',
    marginBottom: 8,
  },
  titleAI: {
    color: '#00D4FF',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 17,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 14,
  },
  featureText: {
    fontSize: 15,
    color: '#1a202c',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF6B35',
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
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 17,
    fontWeight: '600',
  },
});