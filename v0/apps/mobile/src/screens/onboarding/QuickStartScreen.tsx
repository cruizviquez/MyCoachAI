import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../state/OnboardingContext';
import { RoboQoachLogo } from '../../components/RoboQoachLogo';
import { theme } from '../../styles/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
const equipmentOptions = ['None', 'Basic', 'Full Gym'];
const goals = ['Lose Weight', 'Build Muscle', 'Improve Fitness'];

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function QuickStartScreen({ navigation: propNav }: any) {
  const navigation = propNav || useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);
  const { setData } = useOnboarding();
  const [fitnessLevel, setFitnessLevel] = useState(fitnessLevels[0]);
  const [equipment, setEquipment] = useState(equipmentOptions[0]);
  const [goal, setGoal] = useState(goals[0]);

  const handleContinue = () => {
    setData({ fitnessLevel, equipment: [equipment], goals: [goal] });
    navigation.navigate('WorkoutPlan');
  };

  return (
    <ScreenContainer>
  <Text style={styles.screenTitle}>Quick Start</Text>
      <Text style={styles.label}>Fitness Level</Text>
      {fitnessLevels.map(level => (
        <View style={[styles.buttonWrapper, styles.optionButton]} key={level}>
          <Button
            title={level}
            onPress={() => setFitnessLevel(level)}
            variant={fitnessLevel === level ? 'primary' : 'secondary'}
            size="small"
            fullWidth={false}
          />
        </View>
      ))}
      <Text style={styles.label}>Equipment</Text>
      {equipmentOptions.map(option => (
        <View style={[styles.buttonWrapper, styles.optionButton]} key={option}>
          <Button
            title={option}
            onPress={() => setEquipment(option)}
            variant={equipment === option ? 'primary' : 'secondary'}
            size="small"
            fullWidth={false}
          />
        </View>
      ))}
      <Text style={styles.label}>Goal</Text>
      {goals.map(g => (
        <View style={[styles.buttonWrapper, styles.optionButton]} key={g}>
          <Button
            title={g}
            onPress={() => setGoal(g)}
            variant={goal === g ? 'primary' : 'secondary'}
            size="small"
            fullWidth={false}
          />
        </View>
      ))}
      <View style={styles.bottomButton}>
        <Button title="Continue" onPress={handleContinue} size="small" fullWidth={false} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1.1,
    textAlign: 'center',
    marginBottom: 16,
    marginLeft: 0,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 10,
    color: theme.colors.textPrimary,
    alignSelf: 'center',
  },
  // (removed duplicate responsiveButtonText style)
  selected: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionButton: {
    width: 140,
    maxWidth: 180,
    minWidth: 100,
    alignSelf: 'center',
  },
  responsiveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButton: {
    marginTop: 32,
    alignItems: 'center',
  },
});
