import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = screenWidth > 768;

type SetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Setup'>;

export default function SetupScreen() {
  const navigation = useNavigation<SetupScreenNavigationProp>();
  const [level, setLevel] = useState('');
  const [equipment, setEquipment] = useState('');
  const [time, setTime] = useState('');

  const canContinue = level && equipment && time;

  const handleCreateWorkout = () => {
    if (canContinue) {
      navigation.navigate('WorkoutPlan', { level, equipment, time });
    }
  };

  const OptionButton = ({ 
    title, 
    isSelected, 
    onPress,
    compact = false
  }: { 
    title: string; 
    isSelected: boolean; 
    onPress: () => void;
    compact?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.optionButton, 
        compact && styles.compactButton,
        isSelected && styles.selectedOption
      ]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Let's personalize your workout</Text>
            <Text style={styles.subtitle}>Just 3 quick questions to get started</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>1. What's your fitness level?</Text>
            <View style={styles.optionsRow}>
              <OptionButton
                title="Beginner"
                isSelected={level === 'beginner'}
                onPress={() => setLevel('beginner')}
                compact
              />
              <OptionButton
                title="Intermediate"
                isSelected={level === 'intermediate'}
                onPress={() => setLevel('intermediate')}
                compact
              />
              <OptionButton
                title="Advanced"
                isSelected={level === 'advanced'}
                onPress={() => setLevel('advanced')}
                compact
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>2. What equipment do you have?</Text>
            <View style={styles.optionsColumn}>
              <OptionButton
                title="Bodyweight Only"
                isSelected={equipment === 'bodyweight'}
                onPress={() => setEquipment('bodyweight')}
              />
              <OptionButton
                title="Dumbbells"
                isSelected={equipment === 'dumbbells'}
                onPress={() => setEquipment('dumbbells')}
              />
              <OptionButton
                title="Full Gym"
                isSelected={equipment === 'gym'}
                onPress={() => setEquipment('gym')}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>3. How long can you workout?</Text>
            <View style={styles.timeGrid}>
              {['15', '30', '45', '60'].map((minutes) => (
                <OptionButton
                  key={minutes}
                  title={`${minutes} min`}
                  isSelected={time === minutes}
                  onPress={() => setTime(minutes)}
                  compact
                />
              ))}
            </View>
          </View>

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(level ? 33 : 0) + (equipment ? 33 : 0) + (time ? 34 : 0)}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {!canContinue && `${[level, equipment, time].filter(Boolean).length}/3 questions answered`}
              {canContinue && '✓ All set!'}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.createButton, !canContinue && styles.createButtonDisabled]}
            onPress={handleCreateWorkout}
            disabled={!canContinue}
          >
            <Text style={[styles.createButtonText, !canContinue && styles.createButtonTextDisabled]}>
              {canContinue ? 'Create My Workout 🚀' : 'Please answer all questions'}
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
    maxWidth: isWeb ? 800 : '100%',
    alignSelf: 'center',
    width: '100%',
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
    alignItems: 'center',
  },
  title: {
    fontSize: isWeb ? 22 : 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionsColumn: {
    gap: 8,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactButton: {
    flex: 1,
    minWidth: isWeb ? 80 : 70,
  },
  selectedOption: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff5f0',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  createButtonTextDisabled: {
    color: '#999',
  },
});