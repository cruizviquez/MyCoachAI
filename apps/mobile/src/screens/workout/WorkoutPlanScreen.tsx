import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type WorkoutPlanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutPlan'>;

type RouteParams = {
  level: string;
  equipment: string;
  time: string;
};

// Simple workout templates based on user selection
const getWorkoutPlan = (level: string, equipment: string, time: string) => {
  const timeInt = parseInt(time);
  
  if (equipment === 'bodyweight') {
    if (level === 'beginner') {
      return {
        title: `${time}-min Beginner Bodyweight Workout`,
        exercises: [
          { name: 'Squats', sets: 3, reps: timeInt >= 30 ? 12 : 8, emoji: '🏋️' },
          { name: 'Push-ups', sets: 3, reps: timeInt >= 30 ? 10 : 6, emoji: '💪' },
          { name: 'Lunges', sets: 2, reps: timeInt >= 30 ? 10 : 8, emoji: '🦵' },
        ]
      };
    } else {
      return {
        title: `${time}-min ${level} Bodyweight Workout`,
        exercises: [
          { name: 'Squats', sets: 4, reps: timeInt >= 30 ? 15 : 12, emoji: '🏋️' },
          { name: 'Push-ups', sets: 4, reps: timeInt >= 30 ? 12 : 10, emoji: '💪' },
          { name: 'Lunges', sets: 3, reps: timeInt >= 30 ? 12 : 10, emoji: '🦵' },
          { name: 'Plank', sets: 3, reps: `${timeInt >= 30 ? 45 : 30}s`, emoji: '🪨' },
        ]
      };
    }
  }
  
  // Add more equipment-based workouts later
  return {
    title: `${time}-min Custom Workout`,
    exercises: [
      { name: 'Squats', sets: 3, reps: 10, emoji: '🏋️' },
      { name: 'Push-ups', sets: 3, reps: 8, emoji: '💪' },
    ]
  };
};

export default function WorkoutPlanScreen() {
  const navigation = useNavigation<WorkoutPlanScreenNavigationProp>();
  const route = useRoute();
  const { level, equipment, time } = route.params as RouteParams;

  const workout = getWorkoutPlan(level, equipment, time);

  const startWorkout = () => {
    // Navigate to first exercise
    const firstExercise = workout.exercises[0];
    navigation.navigate('ExerciseReady', {
      exercise: {
        name: firstExercise.name,
        sets: firstExercise.sets,
        reps: typeof firstExercise.reps === 'string' ? 0 : firstExercise.reps,
        currentSet: 1,
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{workout.title}</Text>
            <Text style={styles.subtitle}>
              Perfect for {level}s • {equipment} • {time} minutes
            </Text>
          </View>

          <View style={styles.exercisesList}>
            {workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseEmoji}>{exercise.emoji}</Text>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDetails}>
                      {exercise.sets} sets × {exercise.reps} reps
                    </Text>
                  </View>
                  <Text style={styles.exerciseNumber}>{index + 1}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
            <Text style={styles.tipText}>• Focus on proper form over speed</Text>
            <Text style={styles.tipText}>• Rest 30-60 seconds between sets</Text>
            <Text style={styles.tipText}>• Listen to your body and take breaks if needed</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
          <Text style={styles.startButtonText}>Start Workout 🚀</Text>
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
    alignItems: 'center',
    marginBottom: 32,
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
  exercisesList: {
    gap: 16,
    marginBottom: 32,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 16,
    color: '#718096',
  },
  exerciseNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    backgroundColor: '#fff5f0',
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: 'center',
    lineHeight: 36,
  },
  tips: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#32D74B',
    borderStyle: 'dashed',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 4,
  },
  footer: {
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  startButton: {
    backgroundColor: '#FF6B35',
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
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
