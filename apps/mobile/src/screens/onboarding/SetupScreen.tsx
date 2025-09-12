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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Let's personalize your workout</Text>
            <Text style={styles.subtitle}>Just 3 quick questions to get started</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>What's your fitness level?</Text>
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
            <Text style={styles.questionTitle}>What equipment do you have?</Text>
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
            <Text style={styles.questionTitle}>How long can you workout?</Text>
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
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, canContinue && styles.createButtonActive]}
          onPress={handleCreateWorkout}
          disabled={!canContinue}
        >
          <Text style={[styles.createButtonText, canContinue && styles.createButtonTextActive]}>
            Create My Workout ��
          </Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D7D7D',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionsColumn: {
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff5f0',
  },
  optionText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  createButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
  },
  createButtonActive: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a0aec0',
  },
  createButtonTextActive: {
    color: 'white',
  },
});
