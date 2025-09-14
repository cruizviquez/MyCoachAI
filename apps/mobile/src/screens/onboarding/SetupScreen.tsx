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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [fitnessLevel, setFitnessLevel] = useState(data.fitnessLevel || '');
  const [equipment, setEquipment] = useState<string[]>(data.equipment || []);
  const [duration, setDuration] = useState(data.workoutDuration || '');

  const questions = [
    {
      question: "What's your fitness level?",
      options: ['Beginner', 'Intermediate', 'Advanced'],
      type: 'single',
    },
    {
      question: 'What equipment do you have?',
      options: ['None', 'Dumbbells', 'Resistance Bands', 'Pull-up Bar', 'Kettlebell'],
      type: 'multiple',
    },
    {
      question: 'How long can you workout?',
      options: ['15 mins', '30 mins', '45 mins', '60 mins'],
      type: 'single',
    },
  ];

  const handleAnswer = (answer: string) => {
    if (currentQuestion === 0) {
      setFitnessLevel(answer);
    } else if (currentQuestion === 1) {
      if (equipment.includes(answer)) {
        setEquipment(equipment.filter((item) => item !== answer));
      } else {
        setEquipment([...equipment, answer]);
      }
    } else if (currentQuestion === 2) {
      setDuration(answer);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save data to context before navigating
      setData({
        fitnessLevel,
        equipment,
        workoutDuration: duration,
      });
      navigation.navigate('WorkoutPlan');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigation.goBack();
    }
  };

  const isAnswered = () => {
    if (currentQuestion === 0) return fitnessLevel !== '';
    if (currentQuestion === 1) return equipment.length > 0;
    if (currentQuestion === 2) return duration !== '';
    return false;
  };

  const currentQ = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {questions.length}
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQ.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQ.options.map((option) => {
              const isSelected =
                currentQuestion === 0
                  ? fitnessLevel === option
                  : currentQuestion === 1
                  ? equipment.includes(option)
                  : duration === option;

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {currentQuestion === 1 && (
            <Text style={styles.helperText}>
              Select all that apply
            </Text>
          )}
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              !isAnswered() && styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={!isAnswered()}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === questions.length - 1 ? 'Get Started' : 'Next'}
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
    backgroundColor: '#fff5f0',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffe5d9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: 'white',
    minWidth: width < 400 ? 120 : 140,
    alignItems: 'center',
    margin: 6,
  },
  optionButtonSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  optionText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: 'white',
  },
  helperText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  navButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});