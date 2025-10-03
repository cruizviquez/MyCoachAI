import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './onboarding/WelcomeScreen';
import OnboardingProfile from './onboarding/OnboardingProfile';
import OnboardingGoals from './onboarding/OnboardingGoals';
import OnboardingEquipment from './onboarding/OnboardingEquipment';
import OnboardingLimitations from './onboarding/OnboardingLimitations';
import OnboardingSchedule from './onboarding/OnboardingSchedule';
import SetupScreen from './onboarding/SetupScreen';
import WorkoutPlanScreen from './workout/WorkoutPlanScreen';

const Stack = createStackNavigator();

export default function AppFlowNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
  <Stack.Screen name="OnboardingGoals" component={OnboardingGoals} />
  <Stack.Screen name="OnboardingEquipment" component={OnboardingEquipment} />
  <Stack.Screen name="OnboardingLimitations" component={OnboardingLimitations} />
  <Stack.Screen name="OnboardingSchedule" component={OnboardingSchedule} />
  <Stack.Screen name="SetupScreen" component={SetupScreen} />
  <Stack.Screen name="WorkoutPlanScreen" component={WorkoutPlanScreen} />
    </Stack.Navigator>
  );
}
