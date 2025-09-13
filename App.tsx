import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import all screens
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import SetupScreen from './src/screens/onboarding/SetupScreen';
import OnboardingGoals from './src/screens/onboarding/OnboardingGoals';
import OnboardingProfile from './src/screens/onboarding/OnboardingProfile';
import WorkoutPlanScreen from './src/screens/workout/WorkoutPlanScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: { backgroundColor: '#FF8C00' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Setup" 
            component={SetupScreen}
            options={{ title: 'Quick Setup' }}
          />
          <Stack.Screen 
            name="OnboardingGoals" 
            component={OnboardingGoals}
            options={{ title: 'Your Goals' }}
          />
          <Stack.Screen 
            name="OnboardingProfile" 
            component={OnboardingProfile}
            options={{ title: 'Your Profile' }}
          />
          <Stack.Screen 
            name="WorkoutPlan" 
            component={WorkoutPlanScreen}
            options={{ title: 'Your Plan' }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'MyCoachAI' }}
          />
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen} 
            options={{ title: 'Workout' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
