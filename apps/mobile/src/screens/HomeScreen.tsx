import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const todayWorkouts = [
    { id: '1', name: 'Push-ups', sets: 3, reps: 15, icon: 'fitness' },
    { id: '2', name: 'Squats', sets: 3, reps: 20, icon: 'body' },
    { id: '3', name: 'Plank', sets: 3, duration: '30s', icon: 'time' },
  ];

  const handleStartWorkout = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Ionicons name="hand-right" size={20} color="#00D4FF" />
            <Text style={styles.greeting}>Welcome back!</Text>
          </View>
          <Text style={styles.title}>Today's Workout</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Form Score</Text>
          </View>
        </View>

        <View style={styles.workoutSection}>
          <Text style={styles.sectionTitle}>Ready to go?</Text>
          {todayWorkouts.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <Ionicons name={exercise.icon as any} size={24} color="#00D4FF" style={styles.exerciseIcon} />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps || exercise.duration}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="smart-toy" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.startButtonText}>Start Workout with AI Coach</Text>
          </View>
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
    paddingTop: 10,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00D4FF10',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  workoutSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
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
  exerciseIcon: {
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});