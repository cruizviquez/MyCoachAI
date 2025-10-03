import QuickStartScreen from './src/screens/onboarding/QuickStartScreen';
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import context providers
import { OnboardingProvider } from './src/state/OnboardingContext';
import { WorkoutProvider } from './src/state/WorkoutContext';

// Import all screens
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import SetupScreen from './src/screens/onboarding/SetupScreen';
import OnboardingGoals from './src/screens/onboarding/OnboardingGoals';
import OnboardingProfile from './src/screens/onboarding/OnboardingProfile';
import OnboardingLimitations from './src/screens/onboarding/OnboardingLimitations';
import OnboardingEquipment from './src/screens/onboarding/OnboardingEquipment';
import OnboardingSchedule from './src/screens/onboarding/OnboardingSchedule';
import WorkoutPlanScreen from './src/screens/workout/WorkoutPlanScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import OnboardingSingleScreen from './src/screens/OnboardingSingleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <WorkoutProvider>
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
                  name="QuickStart" 
                  component={QuickStartScreen}
                  options={{ title: 'Quick Start' }}
                />
              <Stack.Screen 
                name="OnboardingSingle" 
                component={OnboardingSingleScreen}
                options={{ title: 'Get Started', headerShown: false }}
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
                name="OnboardingLimitations" 
                component={OnboardingLimitations}
                options={{ title: 'Limitations' }}
              />
              <Stack.Screen 
                name="OnboardingEquipment" 
                component={OnboardingEquipment}
                options={{ title: 'Equipment' }}
              />
              <Stack.Screen 
                name="OnboardingSchedule" 
                component={OnboardingSchedule}
                options={{ title: 'Schedule' }}
              />
              <Stack.Screen 
                name="WorkoutPlan" 
                component={WorkoutPlanScreen}
                options={{ 
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'RoboQoach' }}
              />
              <Stack.Screen 
                name="Camera" 
                component={CameraScreen} 
                options={{ title: 'AI Coach' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </WorkoutProvider>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}