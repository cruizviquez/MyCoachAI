import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../state/OnboardingContext';

type OnboardingProfileNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingProfile'>;

export default function OnboardingProfile() {
  const navigation = useNavigation<OnboardingProfileNavigationProp>();
  const { data, setData } = useOnboarding();
  
  // Initialize with data from context
  const [age, setAge] = useState(data.age?.toString() || '');
  const [weight, setWeight] = useState(data.weight?.toString() || '');
  const [height, setHeight] = useState(data.height?.toString() || '');
  const [gender, setGender] = useState(data.gender || 'male');
  const [bmi, setBmi] = useState<string | null>(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = parseFloat(height) / 100;
      const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
      return bmiValue.toFixed(1);
    }
    return null;
  };

  useEffect(() => {
    const calculatedBMI = calculateBMI();
    setBmi(calculatedBMI);
  }, [weight, height]);

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: '#3498db' };
    if (bmiValue < 25) return { category: 'Normal', color: '#2ecc71' };
    if (bmiValue < 30) return { category: 'Overweight', color: '#f39c12' };
    return { category: 'Obese', color: '#e74c3c' };
  };

  const handleContinue = () => {
    const bmiValue = calculateBMI();
    setData({
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender,
      bmi: bmiValue ? parseFloat(bmiValue) : undefined,
    });
    navigation.navigate('OnboardingLimitations');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isFormValid = age && weight && height;

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <Text style={styles.step}>Step 2 of 5</Text>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>Help us personalize your experience</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
                maxLength={5}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                {['male', 'female', 'other'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.genderButton, gender === option && styles.selectedGender]}
                    onPress={() => setGender(option)}
                  >
                    <Text style={[styles.genderText, gender === option && styles.selectedGenderText]}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {bmi && (
              <View style={styles.bmiContainer}>
                <Text style={styles.bmiTitle}>Your BMI</Text>
                <Text style={styles.bmiValue}>{bmi}</Text>
                <Text style={[styles.bmiCategory, { color: getBMICategory(parseFloat(bmi)).color }]}> 
                  {getBMICategory(parseFloat(bmi)).category}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!isFormValid}
            >
              <Text style={[styles.continueButtonText, !isFormValid && styles.continueButtonTextDisabled]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedGender: {
    backgroundColor: '#00D4FF',
    borderColor: '#00D4FF',
  },
  genderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  selectedGenderText: {
    color: 'white',
  },
  bmiContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bmiTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00D4FF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D4FF',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#00D4FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
});