import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type WorkoutPlanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutPlan'>;
type WorkoutPlanScreenRouteProp = RouteProp<RootStackParamList, 'WorkoutPlan'>;

export default function WorkoutPlanScreen() {
  const navigation = useNavigation<WorkoutPlanScreenNavigationProp>();
  const route = useRoute<WorkoutPlanScreenRouteProp>();
  
  const { level, equipment, time } = route.params;

  // Mock workout based on selections
  const getWorkout = () => {
    const exercises = equipment === 'bodyweight' 
      ? ['Push-ups', 'Squats', 'Plank', 'Jumping Jacks']
      : equipment === 'dumbbells'
      ? ['Dumbbell Press', 'Goblet Squats', 'Bent-Over Rows', 'Shoulder Press']
      : ['Bench Press', 'Leg Press', 'Lat Pulldown', 'Cable Flyes'];

    const sets = level === 'beginner' ? '3 sets' : level === 'intermediate' ? '4 sets' : '5 sets';
    
    return exercises.map(exercise => ({
      name: exercise,
      sets: sets,
      duration: `${Math.floor(parseInt(time) / exercises.length)} min`
    }));
  };

  const workout = getWorkout();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Personalized Plan</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Level</Text>
              <Text style={styles.summaryValue}>{level}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Equipment</Text>
              <Text style={styles.summaryValue}>{equipment}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>{time} min</Text>
            </View>
          </View>
        </View>

        <View style={styles.workoutContainer}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          {workout.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <View style={styles.exerciseNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>{exercise.sets} • {exercise.duration}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startButtonText}>Start Workout 💪</Text>
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  workoutContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});