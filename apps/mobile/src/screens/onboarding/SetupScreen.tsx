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

  const handleCreateWorkout = () => {
    console.log('BUTTON CLICKED!'); // Debug log
    navigation.navigate('WorkoutPlan', { 
      level: level || 'beginner', 
      equipment: equipment || 'bodyweight', 
      time: time || '30'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Let's personalize your workout</Text>
          <Text style={styles.subtitle}>Just 3 quick questions to get started</Text>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>What's your fitness level?</Text>
            <TouchableOpacity
              style={[styles.optionButton, level === 'beginner' && styles.selectedOption]}
              onPress={() => setLevel('beginner')}
            >
              <Text>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, level === 'intermediate' && styles.selectedOption]}
              onPress={() => setLevel('intermediate')}
            >
              <Text>Intermediate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>Equipment?</Text>
            <TouchableOpacity
              style={[styles.optionButton, equipment === 'bodyweight' && styles.selectedOption]}
              onPress={() => setEquipment('bodyweight')}
            >
              <Text>Bodyweight Only</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, equipment === 'dumbbells' && styles.selectedOption]}
              onPress={() => setEquipment('dumbbells')}
            >
              <Text>Dumbbells</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.questionTitle}>Time?</Text>
            <TouchableOpacity
              style={[styles.optionButton, time === '30' && styles.selectedOption]}
              onPress={() => setTime('30')}
            >
              <Text>30 min</Text>
            </TouchableOpacity>
          </View>

          {/* SUPER OBVIOUS BUTTON */}
          <TouchableOpacity
            style={styles.bigButton}
            onPress={handleCreateWorkout}
          >
            <Text style={styles.bigButtonText}>
              CLICK ME TO CONTINUE
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#ffeecc',
    borderColor: '#ff6600',
  },
  bigButton: {
    backgroundColor: 'red',
    padding: 30,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 10,
  },
  bigButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
