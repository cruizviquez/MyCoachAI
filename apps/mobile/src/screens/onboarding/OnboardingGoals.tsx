import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
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
    { id: 'weight_loss', title: 'Lose Weight', icon: 'flame', iconType: 'Ionicons', description: 'Burn fat & get lean' },
    { id: 'muscle_gain', title: 'Build Muscle', icon: 'fitness', iconType: 'Ionicons', description: 'Gain strength & size' },
    { id: 'flexibility', title: 'Improve Flexibility', icon: 'body', iconType: 'Ionicons', description: 'Increase mobility' },
    { id: 'general_fitness', title: 'General Fitness', icon: 'run', iconType: 'Ionicons', description: 'Overall health' },
    { id: 'endurance', title: 'Build Endurance', icon: 'zap', iconType: 'Feather', description: 'Boost stamina' },
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
                  <View style={styles.goalIconContainer}>
                    {goal.iconType === 'Feather' ? (
                      <Feather name={goal.icon as any} size={20} color={isSelected ? '#FFFFFF' : '#00D4FF'} />
                    ) : (
                      <Ionicons name={goal.icon as any} size={20} color={isSelected ? '#FFFFFF' : '#00D4FF'} />
                    )}
                  </View>
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
                      <Ionicons name="checkmark" size={12} color="white" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Spacing for bottom buttons */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Bottom Button Container */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton, 
              styles.nextButton, 
              selectedGoals.length === 0 && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={selectedGoals.length === 0}
          >
            <Text style={[
              styles.nextButtonText, 
              selectedGoals.length === 0 && styles.nextButtonTextDisabled
            ]}>
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
    backgroundColor: '#00D4FF',
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
    color: '#000000',
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
    borderColor: '#00D4FF',
    backgroundColor: '#f0f9ff',
  },
  goalIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#00D4FF',
  },
  selectedSubtext: {
    color: '#40B8E0',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00D4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 20 : 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00D4FF',
    marginRight: 6,
  },
  nextButton: {
    backgroundColor: '#00D4FF',
    marginLeft: 6,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D4FF',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});