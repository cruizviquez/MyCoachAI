import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type OnboardingGoalsNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingGoals'>;

export default function OnboardingGoals() {
  const navigation = useNavigation<OnboardingGoalsNavigationProp>();
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    { id: 'weight_loss', title: 'Lose Weight', icon: '🔥', description: 'Burn fat & get lean' },
    { id: 'muscle_gain', title: 'Build Muscle', icon: '💪', description: 'Gain strength & size' },
    { id: 'flexibility', title: 'Improve Flexibility', icon: '🧘', description: 'Increase mobility' },
    { id: 'general_fitness', title: 'General Fitness', icon: '🏃', description: 'Overall health' },
    { id: 'endurance', title: 'Build Endurance', icon: '⚡', description: 'Boost stamina' },
  ];

  const handleNext = () => {
    if (selectedGoal) {
      navigation.navigate('Setup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '20%' }]} />
          </View>
          <Text style={styles.step}>Step 1 of 5</Text>
          <Text style={styles.title}>What's your main goal?</Text>
          <Text style={styles.subtitle}>We'll customize your workouts</Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[styles.goalCard, selectedGoal === goal.id && styles.selectedGoal]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <View style={styles.goalTextContainer}>
                <Text style={[styles.goalTitle, selectedGoal === goal.id && styles.selectedText]}>
                  {goal.title}
                </Text>
                <Text style={[styles.goalDescription, selectedGoal === goal.id && styles.selectedSubtext]}>
                  {goal.description}
                </Text>
              </View>
              {selectedGoal === goal.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selectedGoal && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedGoal}
        >
          <Text style={[styles.nextButtonText, !selectedGoal && styles.nextButtonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  goalsContainer: {
    padding: 20,
    paddingTop: 5,
  },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 70,
  },
  selectedGoal: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  goalIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 13,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
  },
  selectedSubtext: {
    color: '#FF8C60',
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});