import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('Setup');
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
            <Text style={styles.featureText}>No equipment needed</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <Text style={styles.featureText}>Real-time form feedback</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>⚡</Text>
            <Text style={styles.featureText}>Quick personalized workouts</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started 🚀</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
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
    color: '#FF6B35', // Orange for AI
  },
  subtitle: {
    fontSize: 18,
    color: '#2D7D7D', // Teal
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
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#32D74B', // Green accent
  },
  featureEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#1a202c',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF6B35', // Energy orange
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
