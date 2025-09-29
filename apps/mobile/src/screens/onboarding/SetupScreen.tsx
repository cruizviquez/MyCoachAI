import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../state/OnboardingContext';

type SetupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Setup'>;
};

const { width } = Dimensions.get('window');

export default function SetupScreen({ navigation }: SetupScreenProps) {
  const { data, setData } = useOnboarding();
  
  // Initialize state with existing data from context
  const [fitnessLevel, setFitnessLevel] = useState(data.fitnessLevel || '');
  const [equipment, setEquipment] = useState<string[]>(data.equipment || []);
  const [duration, setDuration] = useState(data.workoutDuration || '');

  const toggleEquipment = (item: string) => {
    if (equipment.includes(item)) {
      setEquipment(equipment.filter(e => e !== item));
    } else {
      setEquipment([...equipment, item]);
    }
  };

  const handleGetStarted = () => {
    // Save data to context before navigating
    setData({
      fitnessLevel,
      equipment,
      workoutDuration: duration,
    });
    navigation.navigate('WorkoutPlan', {
      level: fitnessLevel,
      equipment: equipment[0] || '',
      time: duration,
    });
  };

  const isFormComplete = fitnessLevel && equipment.length > 0 && duration;

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Question 1: Fitness Level */}
        <View style={styles.questionSection}>
          <Text style={styles.questionNumber}>1.</Text>
          <Text style={styles.question}>What's your fitness level?</Text>
          <View style={styles.optionsContainer}>
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  fitnessLevel === level && styles.optionButtonSelected,
                ]}
                onPress={() => setFitnessLevel(level)}
              >
                <Text
                  style={[
                    styles.optionText,
                    fitnessLevel === level && styles.optionTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 2: Equipment */}
        <View style={styles.questionSection}>
          <Text style={styles.questionNumber}>2.</Text>
          <Text style={styles.question}>What equipment do you have?</Text>
          <Text style={styles.helperText}>Select all that apply</Text>
          <View style={styles.optionsContainer}>
            {['None', 'Dumbbells', 'Resistance Bands', 'Pull-up Bar', 'Kettlebell'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionButton,
                  equipment.includes(item) && styles.optionButtonSelected,
                ]}
                onPress={() => toggleEquipment(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    equipment.includes(item) && styles.optionTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 3: Duration */}
        <View style={styles.questionSection}>
          <Text style={styles.questionNumber}>3.</Text>
          <Text style={styles.question}>How long can you workout?</Text>
          <View style={styles.optionsContainer}>
            {['15 mins', '30 mins', '45 mins', '60 mins'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.optionButton,
                  duration === time && styles.optionButtonSelected,
                ]}
                onPress={() => setDuration(time)}
              >
                <Text
                  style={[
                    styles.optionText,
                    duration === time && styles.optionTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.getStartedButton,
              !isFormComplete && styles.disabledButton,
            ]}
            onPress={handleGetStarted}
            disabled={!isFormComplete}
          >
            <Text style={styles.getStartedText}>
              Get Started
            </Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  questionSection: {
    marginBottom: 35,
  },
  questionNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#00D4FF',
    backgroundColor: 'white',
    margin: 6,
    minWidth: width < 400 ? 100 : 120,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#00D4FF',
    borderColor: '#00D4FF',
  },
  optionText: {
    fontSize: 15,
    color: '#00D4FF',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});