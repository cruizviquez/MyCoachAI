import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
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
            <Ionicons name="fitness" size={32} color="#00D4FF" style={styles.logoIcon} />
            <MaterialIcons name="smart-toy" size={28} color="#FF6B35" style={styles.logoRobot} />
          </View>
          <Text style={styles.title}>
            <Text style={styles.titleMain}>MyCoach</Text><Text style={styles.titleAI}>AI</Text>
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
            <Ionicons name="barbell" size={20} color="#00D4FF" style={styles.featureIcon} />
            <Text style={styles.featureText}>Smart workout generation</Text>
          </View>
          <View style={styles.feature}>
            <Feather name="target" size={20} color="#00D4FF" style={styles.featureIcon} />
            <Text style={styles.featureText}>Real-time form feedback</Text>
          </View>
          <View style={styles.feature}>
            <Feather name="trending-up" size={20} color="#00D4FF" style={styles.featureIcon} />
            <Text style={styles.featureText}>Track your progress</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePersonalizedSetup}>
            <View style={styles.buttonContent}>
              <Feather name="target" size={18} color="white" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Personalized Setup</Text>
            </View>
            <Text style={styles.buttonSubtext}>Get AI-optimized workouts (2 min)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleQuickSetup}>
            <View style={styles.buttonContent}>
              <Feather name="zap" size={16} color="#FF6B35" style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Quick Start</Text>
            </View>
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
    marginRight: 8,
  },
  logoRobot: {
    marginLeft: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleMain: {
    color: '#000000',
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
    borderLeftColor: '#00D4FF',
  },
  featureIcon: {
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
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
    transform: [{ scale: 1 }],
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
    borderColor: '#00D4FF',
    transform: [{ scale: 1 }],
  },
  secondaryButtonText: {
    color: '#00D4FF',
    fontSize: 17,
    fontWeight: '600',
  },
});