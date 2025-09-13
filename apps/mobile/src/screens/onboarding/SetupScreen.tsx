import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

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
    onPress 
  }: { 
    title: string; 
    isSelected: boolean; 
    onPress: () => void 
  }) => (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            />
            <OptionButton
              title="Intermediate"
              isSelected={level === 'intermediate'}
              onPress={() => setLevel('intermediate')}
            />
            <OptionButton
              title="Advanced"
              isSelected={level === 'advanced'}
              onPress={() => setLevel('advanced')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.questionTitle}>2. What equipment do you have?</Text>
          <View style={styles.optionsGrid}>
            <OptionButton
              title="Bodyweight"
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
          <View style={styles.optionsRow}>
            <OptionButton
              title="15 min"
              isSelected={time === '15'}
              onPress={() => setTime('15')}
            />
            <OptionButton
              title="30 min"
              isSelected={time === '30'}
              onPress={() => setTime('30')}
            />
            <OptionButton
              title="45 min"
              isSelected={time === '45'}
              onPress={() => setTime('45')}
            />
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

        {/* Create button */}
        <TouchableOpacity
          style={[styles.createButton, !canContinue && styles.createButtonDisabled]}
          onPress={handleCreateWorkout}
          disabled={!canContinue}
        >
          <Text style={[styles.createButtonText, !canContinue && styles.createButtonTextDisabled]}>
            {canContinue ? 'Create My Workout 🚀' : 'Please answer all questions'}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
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
    marginTop: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  createButtonTextDisabled: {
    color: '#999',
  },
});