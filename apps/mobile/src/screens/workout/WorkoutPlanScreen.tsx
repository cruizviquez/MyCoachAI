import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../state/OnboardingContext';
import { useWorkout } from '../../state/WorkoutContext';
import { generateWorkoutPlan } from '../../services/workoutGenerator';

type WorkoutPlanScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WorkoutPlan'>;
};

export default function WorkoutPlanScreen({ navigation }: WorkoutPlanScreenProps) {
  const { data } = useOnboarding();
  const { currentWorkout, setCurrentWorkout } = useWorkout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateNewWorkout();
  }, []);

  const generateNewWorkout = async () => {
    try {
      setLoading(true);
      setError(null);
      const workout = await generateWorkoutPlan(data);
      setCurrentWorkout(workout);
    } catch (err) {
      setError('Failed to generate workout. Please try again.');
      console.error('Workout generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWorkout = () => {
    if (currentWorkout) {
      navigation.navigate('Home');
    }
  };

  const handleRegenerateWorkout = () => {
    Alert.alert(
      'Generate New Workout',
      'This will replace your current workout plan. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
              { text: 'Generate', onPress: () => generateNewWorkout() }, // Make sure this is called
      ]
    );
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00D4FF" />
          <Text style={styles.loadingText}>Generating your workout plan...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={generateNewWorkout}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  if (!currentWorkout) {
    return null;
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Workout Plan</Text>
          <Text style={styles.subtitle}>{currentWorkout.name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentWorkout.totalDuration}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentWorkout.exercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentWorkout.difficulty}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>
        </View>

        <View style={styles.exercisesContainer}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {currentWorkout.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseNumber}>{index + 1}</Text>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>
              <View style={styles.exerciseDetails}>
                {exercise.sets && exercise.reps ? (
                  <Text style={styles.exerciseInfo}>
                    {exercise.sets} sets × {exercise.reps} reps
                  </Text>
                ) : exercise.duration ? (
                  <Text style={styles.exerciseInfo}>
                    {exercise.sets > 1 ? `${exercise.sets} sets × ` : ''}
                    {exercise.duration} seconds
                  </Text>
                ) : null}
                <Text style={styles.restInfo}>Rest: {exercise.rest}s</Text>
              </View>
              {exercise.description && (
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartWorkout}
          >
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={handleRegenerateWorkout}
          >
            <Text style={styles.regenerateButtonText}>Generate New Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00D4FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4FF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  exercisesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00D4FF',
    color: 'white',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exerciseInfo: {
    fontSize: 16,
    color: '#666',
  },
  restInfo: {
    fontSize: 14,
    color: '#999',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  regenerateButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00D4FF',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  regenerateButtonText: {
    color: '#00D4FF',
    fontSize: 16,
    fontWeight: '600',
  },
});