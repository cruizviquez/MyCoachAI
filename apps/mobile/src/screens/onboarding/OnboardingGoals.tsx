import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../state/OnboardingContext';

const { height: screenHeight } = Dimensions.get('window');

type OnboardingGoalsNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingGoals'>;

export default function OnboardingGoals() {
  const navigation = useNavigation<OnboardingGoalsNavigationProp>();
  const { data, setData } = useOnboarding();
  
  // Initialize with existing data from context (support multiple goals)
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);

  const goals = [
    { id: 'weight_loss', title: 'Lose Weight', icon: '🔥', description: 'Burn fat & get lean' },
    { id: 'muscle_gain', title: 'Build Muscle', icon: '💪', description: 'Gain strength & size' },
    { id: 'flexibility', title: 'Improve Flexibility', icon: '🧘', description: 'Increase mobility' },
    { id: 'general_fitness', title: 'General Fitness', icon: '🏃', description: 'Overall health' },
    { id: 'endurance', title: 'Build Endurance', icon: '⚡', description: 'Boost stamina' },
  ];

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goalId));
    } else {
      // Allow multiple goals or limit to one
      // For single goal selection:
      setSelectedGoals([goalId]);
      // For multiple goals selection:
      // setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      // Save to context before navigating
      setData({ goals: selectedGoals });
      navigation.navigate('OnboardingProfile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
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
            {goals.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);
              
              return (
                <TouchableOpacity
                  key={goal.id}
                  style={[styles.goalCard, isSelected && styles.selectedGoal]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <Text style={styles.goalIcon}>{goal.icon}</Text>
                  <View style={styles.goalTextContainer}>
                    <Text style={[styles.goalTitle, isSelected && styles.selectedText]}>
                      {goal.title}
                    </Text>
                    <Text style={[styles.goalDescription, isSelected && styles.selectedSubtext]}>
                      {goal.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.nextButton, selectedGoals.length === 0 && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={selectedGoals.length === 0}
          >
            <Text style={[styles.nextButtonText, selectedGoals.length === 0 && styles.nextButtonTextDisabled]}>
              Continue
            </Text>
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
  innerContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 10,
  },
  header: {
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  goalsContainer: {
    marginTop: 10,
  },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 60,
  },
  selectedGoal: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#FF6B35',
  },
  selectedSubtext: {
    color: '#FF8C60',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff5f0',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
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