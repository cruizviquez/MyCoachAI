// ============================================
// FILE 5: src/screens/OnboardingScreen.tsx
// COMPLETE ONBOARDING WITH FIXED BUTTONS
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { ScreenContainer, Button } from 'components';
import { theme } from 'styles/theme';
import { responsive } from 'utils/responsive';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingProfile'>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [userData, setUserData] = useState({
    name: '',
    goal: '',
    level: '',
  });

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('onboarded', 'true');
    navigation.replace('Dashboard');
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>RQ</Text>
        </View>
        <Text style={styles.brandName}>
          Robo<Text style={{ color: theme.colors.primary }}>Qoach</Text>
        </Text>
        <Text style={styles.tagline}>AI-Powered Fitness Coaching</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.label}>What's your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={theme.colors.textMuted}
          value={userData.name}
          onChangeText={(text) => setUserData({...userData, name: text})}
        />

        <Text style={styles.label}>Select your goal</Text>
        <View style={styles.optionsContainer}>
          {['strength', 'weight_loss', 'endurance'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.option,
                userData.goal === goal && styles.optionActive,
              ]}
              onPress={() => setUserData({...userData, goal})}
            >
              <Text style={[
                styles.optionText,
                userData.goal === goal && styles.optionTextActive,
              ]}>
                {goal.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Fitness level</Text>
        <View style={styles.optionsContainer}>
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.option,
                userData.level === level && styles.optionActive,
              ]}
              onPress={() => setUserData({...userData, level})}
            >
              <Text style={[
                styles.optionText,
                userData.level === level && styles.optionTextActive,
              ]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Fixed Bottom Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Start Training"
          onPress={completeOnboarding}
          disabled={!userData.name || !userData.goal || !userData.level}
          size="large"
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    paddingVertical: responsive.vScale(40),
  },
  logoCircle: {
    width: responsive.scale(80),
    height: responsive.scale(80),
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.vScale(16),
  },
  logoText: {
    fontSize: responsive.fontSize(32),
    fontWeight: '900',
    color: '#000',
  },
  brandName: {
    fontSize: responsive.fontSize(32),
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: responsive.vScale(8),
  },
  tagline: {
    fontSize: responsive.fontSize(16),
    color: theme.colors.textSecondary,
  },
  formSection: {
    flex: 1,
    paddingBottom: responsive.vScale(20),
  },
  label: {
    fontSize: responsive.fontSize(16),
    color: theme.colors.textSecondary,
    marginBottom: responsive.vScale(12),
    marginTop: responsive.vScale(24),
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: responsive.scale(16),
    color: theme.colors.textPrimary,
    fontSize: responsive.fontSize(16),
    borderWidth: 1,
    borderColor: theme.colors.surfaceLight,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.scale(12),
  },
  option: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: theme.colors.surface,
    padding: responsive.scale(16),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  optionText: {
    fontSize: responsive.fontSize(14),
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  optionTextActive: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    paddingTop: responsive.vScale(20),
  },
});