import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
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
      // Store profile data (we'll add context later)
      navigation.navigate('Setup'); // For now, go to existing setup
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
          <Text style={styles.step}>Step 2 of 5</Text>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>This helps us calculate calories and adjust intensity</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="25"
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
                placeholder="70"
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
                placeholder="175"
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderOptions}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                onPress={() => setGender('male')}
              >
                <Text style={[styles.genderText, gender === 'male' && styles.selectedGenderText]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                onPress={() => setGender('female')}
              >
                <Text style={[styles.genderText, gender === 'female' && styles.selectedGenderText]}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'other' && styles.selectedGender]}
                onPress={() => setGender('other')}
              >
                <Text style={[styles.genderText, gender === 'other' && styles.selectedGenderText]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BMI calculation preview */}
          {weight && height && (
            <View style={styles.bmiContainer}>
              <Text style={styles.bmiLabel}>Your BMI:</Text>
              <Text style={styles.bmiValue}>
                {(parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1)}
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
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  step: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    padding: 20,
    paddingTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
    fontSize: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  bmiLabel: {
    fontSize: 16,
    color: '#666',
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
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
