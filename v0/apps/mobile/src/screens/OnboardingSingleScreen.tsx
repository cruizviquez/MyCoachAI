
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { RoboQoachLogo } from '../components/RoboQoachLogo';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useOnboarding } from '../state/OnboardingContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

// --- CONSTANTS ---
const unitOptions = [
  { id: 'metric', label: 'Metric (kg, cm)' },
  { id: 'imperial', label: 'Imperial (lb, in)' },
];
const goals = [
  { id: 'weight_loss', title: 'Lose Weight', icon: <MaterialIcons name="local-fire-department" size={24} color={theme.colors.primary} /> },
  { id: 'muscle_gain', title: 'Build Muscle', icon: <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} /> },
  { id: 'flexibility', title: 'Flexibility', icon: <Ionicons name="body" size={24} color={theme.colors.primary} /> },
  { id: 'general_fitness', title: 'General Fitness', icon: <MaterialIcons name="directions-run" size={24} color={theme.colors.primary} /> },
  { id: 'endurance', title: 'Endurance', icon: <Ionicons name="flash" size={24} color={theme.colors.primary} /> },
];
const fitnessLevels = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];
const equipmentList = [
  { id: 'none', label: 'None', icon: <MaterialIcons name="block" size={24} color={theme.colors.primary} /> },
  { id: 'dumbbells', label: 'Dumbbells', icon: <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} /> },
  { id: 'resistance_bands', label: 'Resistance Bands', icon: <MaterialIcons name="linear-scale" size={24} color={theme.colors.primary} /> },
  { id: 'kettlebell', label: 'Kettlebell', icon: <MaterialIcons name="sports-kabaddi" size={24} color={theme.colors.primary} /> },
  { id: 'pullup_bar', label: 'Pull-up Bar', icon: <MaterialIcons name="horizontal-rule" size={24} color={theme.colors.primary} /> },
  { id: 'bench', label: 'Bench', icon: <MaterialIcons name="weekend" size={24} color={theme.colors.primary} /> },
];
const limitationsList = [
  { id: 'none', label: 'None', icon: <MaterialIcons name="check-circle" size={24} color={theme.colors.primary} /> },
  { id: 'back', label: 'Back problems', icon: <MaterialIcons name="accessibility" size={24} color={theme.colors.primary} /> },
  { id: 'knee', label: 'Knee problems', icon: <MaterialIcons name="directions-run" size={24} color={theme.colors.primary} /> },
  { id: 'shoulder', label: 'Shoulder problems', icon: <MaterialIcons name="pan-tool" size={24} color={theme.colors.primary} /> },
  { id: 'hip', label: 'Hip problems', icon: <MaterialIcons name="directions-walk" size={24} color={theme.colors.primary} /> },
  { id: 'other', label: 'Other', icon: <MaterialIcons name="warning" size={24} color={theme.colors.primary} /> },
];
const dayOptions = [2, 3, 4, 5, 6, 7];
const timeOptions = [
  { id: 'morning', label: 'Morning', icon: <MaterialIcons name="wb-sunny" size={24} color={theme.colors.primary} /> },
  { id: 'afternoon', label: 'Afternoon', icon: <MaterialIcons name="wb-cloudy" size={24} color={theme.colors.primary} /> },
  { id: 'evening', label: 'Evening', icon: <MaterialIcons name="nights-stay" size={24} color={theme.colors.primary} /> },
  { id: 'night', label: 'Night', icon: <Ionicons name="moon" size={24} color={theme.colors.primary} /> },
];

  // --- COMPONENT ---
export default function OnboardingSingleScreen() {
  // State and hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'OnboardingSingle'>>();
  const { setData } = useOnboarding();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedLimitations, setSelectedLimitations] = useState<string[]>([]);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [preferredTime, setPreferredTime] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);

  useEffect(() => {
    if (weight && height) {
      const h = parseFloat(height) / 100;
      const bmiValue = parseFloat(weight) / (h * h);
      setBmi(bmiValue ? bmiValue.toFixed(1) : null);
    } else {
      setBmi(null);
    }
  }, [weight, height]);

  const toggleEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter(e => e !== id));
    } else {
      setSelectedEquipment([...selectedEquipment.filter(e => e !== 'none'), id]);
    }
  };

  const toggleLimitation = (id: string) => {
    if (selectedLimitations.includes(id)) {
      setSelectedLimitations(selectedLimitations.filter(l => l !== id));
    } else {
      setSelectedLimitations([...selectedLimitations.filter(l => l !== 'none'), id]);
    }
  };

  const isFormValid = name && age && weight && height && selectedGoal && fitnessLevel;

  const handleStart = () => {
    setData({
      name,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender,
      goals: [selectedGoal],
      fitnessLevel,
      equipment: selectedEquipment,
      limitations: selectedLimitations,
      schedule: { daysPerWeek, preferredTime },
      bmi: bmi ? parseFloat(bmi) : undefined,
    });
    navigation.navigate('WorkoutPlan', {
      level: fitnessLevel,
      equipment: selectedEquipment.join(', '),
      time: preferredTime,
      goal: selectedGoal,
      limitations: selectedLimitations,
      profile: {
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        age: age ? parseInt(age) : undefined,
        gender,
      },
      schedule: {
        daysPerWeek,
        preferredTime,
      },
    });
  };

  return (
    <ScreenContainer scrollable={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <View style={styles.logoTitleRow}>
            <RoboQoachLogo size={40} />
            <Text style={styles.brandTitle}>RoboQoach</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ color: theme.colors.textSecondary, marginRight: 4 }}>Unit</Text>
            <Switch
              value={unit === 'imperial'}
              onValueChange={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
              thumbColor={unit === 'imperial' ? theme.colors.primary : theme.colors.surfaceLight}
              trackColor={{ false: theme.colors.surfaceLight, true: theme.colors.primary }}
            />
          </View>
        </View>
        <View style={styles.unitToggleRow}>
          {unitOptions.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.unitToggleButton, unit === opt.id && styles.selectedUnitToggle]}
              onPress={() => setUnit(opt.id as 'metric' | 'imperial')}
            >
              <Text style={[styles.unitToggleText, unit === opt.id && styles.selectedUnitToggleText]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
  <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Let's personalize your experience</Text>
          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.textMuted}
            value={name}
            onChangeText={setName}
          />
          {/* Age, Weight, Height, Gender */}
          <View style={styles.row}>
            <View style={styles.inputGroupSmall}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
            <View style={styles.inputGroupSmall}>
              <Text style={styles.label}>Weight {unit === 'metric' ? '(kg)' : '(lb)'}</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
                maxLength={5}
              />
            </View>
            <View style={styles.inputGroupSmall}>
              <Text style={styles.label}>Height {unit === 'metric' ? '(cm)' : '(in)'}</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            {['male', 'female', 'other'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderButton, gender === g && styles.selectedGender]}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.genderText, gender === g && styles.selectedGenderText]}>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {bmi && (
            <View style={styles.bmiContainer}>
              <Text style={styles.bmiTitle}>Your BMI</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
            </View>
          )}
          {/* Goal */}
          <Text style={styles.label}>Main Goal</Text>
          <View style={styles.optionsRow}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[styles.optionButton, selectedGoal === goal.id && styles.selectedOption]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={styles.optionIcon}>{goal.icon}</Text>
                <Text style={styles.optionText}>{goal.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Fitness Level */}
          <Text style={styles.label}>Fitness Level</Text>
          <View style={styles.optionsRow}>
            {fitnessLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[styles.optionButton, fitnessLevel === level.id && styles.selectedOption]}
                onPress={() => setFitnessLevel(level.id)}
              >
                <Text style={styles.optionText}>{level.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Equipment */}
          <Text style={styles.label}>Available Equipment</Text>
          <View style={styles.optionsRowWrap}>
            {equipmentList.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.optionButton, selectedEquipment.includes(item.id) && styles.selectedOption]}
                onPress={() => toggleEquipment(item.id)}
              >
                <Text style={styles.optionIcon}>{item.icon}</Text>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Limitations */}
          <Text style={styles.label}>Limitations</Text>
          <View style={styles.optionsRowWrap}>
            {limitationsList.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.optionButton, selectedLimitations.includes(item.id) && styles.selectedOption]}
                onPress={() => toggleLimitation(item.id)}
              >
                <Text style={styles.optionIcon}>{item.icon}</Text>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Schedule */}
          <Text style={styles.label}>Workout Schedule</Text>
          <View style={styles.row}>
            <View style={styles.inputGroupSmall}>
              <Text style={styles.label}>Days/Week</Text>
              <View style={styles.optionsRow}>
                {dayOptions.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[styles.optionButtonSmall, daysPerWeek === day && styles.selectedOption]}
                    onPress={() => setDaysPerWeek(day)}
                  >
                    <Text style={styles.optionText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputGroupSmall}>
              <Text style={styles.label}>Preferred Time</Text>
              <View style={styles.optionsRow}>
                {timeOptions.map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[styles.optionButtonSmall, preferredTime === t.id && styles.selectedOption]}
                    onPress={() => setPreferredTime(t.id)}
                  >
                    <Text style={styles.optionIcon}>{t.icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <Button
            title="Get Started"
            onPress={handleStart}
            disabled={!isFormValid}
            size="large"
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  unitToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.surfaceLight,
  },
  selectedUnitToggle: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surfaceLight,
    marginRight: 6,
    marginBottom: 6,
    minWidth: 80,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionIcon: {
    fontSize: 20,
    marginBottom: 2,
    color: theme.colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  optionButtonSmall: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surfaceLight,
    marginRight: 4,
    marginBottom: 4,
    minWidth: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 8,
  },
  logoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 10,
    letterSpacing: 1.2,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
  },
  unitToggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  unitToggleText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  selectedUnitToggleText: {
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: '#0a0a0a',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 18,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    color: theme.colors.textPrimary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.surfaceLight,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  inputGroupSmall: {
    flex: 1,
    minWidth: 90,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surfaceLight,
    marginHorizontal: 2,
  },
  selectedGender: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  genderText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  selectedGenderText: {
    color: 'white',
  },
  bmiContainer: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bmiTitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  bmiValue: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  optionsRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
});
