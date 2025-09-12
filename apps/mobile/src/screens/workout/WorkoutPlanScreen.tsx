import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Workout Plan</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Setup Complete! 🎉</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Level:</Text>
            <Text style={styles.value}>{level}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Equipment:</Text>
            <Text style={styles.value}>{equipment}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{time} min</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startButtonText}>Start Workout 💪</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0', // light orange background to match SetupScreen
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35', // matching orange from SetupScreen
    marginBottom: 40,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 40,
    minWidth: 280,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1a202c',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  startButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
