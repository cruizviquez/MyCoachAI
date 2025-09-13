import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type OnboardingProfileNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingProfile'>;

export default function OnboardingProfile() {
  const navigation = useNavigation<OnboardingProfileNavigationProp>();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const canContinue = age && weight && height && gender;

  const handleNext = () => {
    if (canContinue) {
      navigation.navigate('OnboardingLimitations');
    }
  };

  const getBMI = () => {
    if (weight && height) {
      const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);
      return bmi.toFixed(1);
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '40%' }]} />
              </View>
              <Text style={styles.step}>Step 2 of 5</Text>
              <Text style={styles.title}>Your Profile</Text>
              <Text style={styles.subtitle}>Help us personalize your experience</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  placeholder="Enter your age"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Enter weight"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                  <Text style={styles.label}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Enter height"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderOptions}>
                  {['Male', 'Female', 'Other'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.genderButton, gender === option.toLowerCase() && styles.selectedGender]}
                      onPress={() => setGender(option.toLowerCase())}
                    >
                      <Text style={[styles.genderText, gender === option.toLowerCase() && styles.selectedGenderText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {getBMI() && (
                <View style={styles.bmiContainer}>
                  <Text style={styles.bmiLabel}>Your BMI:</Text>
                  <Text style={styles.bmiValue}>{getBMI()}</Text>
                  <Text style={styles.bmiStatus}>
                    {parseFloat(getBMI()) < 18.5 ? 'Underweight' :
                     parseFloat(getBMI()) < 25 ? 'Normal' :
                     parseFloat(getBMI()) < 30 ? 'Overweight' : 'Obese'}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={!canContinue}
            >
              <Text style={[styles.nextButtonText, !canContinue && styles.nextButtonTextDisabled]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedGender: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff8f5',
  },
  genderText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  selectedGenderText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  bmiContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  bmiLabel: {
    fontSize: 14,
    color: '#666',
  },
  bmiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginVertical: 5,
  },
  bmiStatus: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#999',
  },
});