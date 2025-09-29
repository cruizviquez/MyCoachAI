import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { theme } from '../../styles/theme';*/

export interface OnboardingData {
  fitnessLevel?: string;
  equipment?: string[];
  workoutDuration?: string;
  goals?: string[];
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
  bmi?: number;
  limitations?: string[];
  schedule?: {
    daysPerWeek: number;
    preferredTime: string;
  };
}

interface OnboardingContextProps {
  data: OnboardingData;
  setData: (updates: Partial<OnboardingData>) => void;
  clearData: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setDataState] = useState<OnboardingData>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await AsyncStorage.getItem('@onboarding_data');
        if (json) setDataState(JSON.parse(json));
      } catch (e) {
        console.error('Failed to load onboarding data', e);
      }
    };
    loadData();
  }, []);

  const setData = (updates: Partial<OnboardingData>) => {
    setDataState((prev) => {
      const newData = { ...prev, ...updates };
      AsyncStorage.setItem('@onboarding_data', JSON.stringify(newData)).catch(console.error);
      return newData;
    });
  };

  const clearData = () => {
    setDataState({});
    AsyncStorage.removeItem('@onboarding_data').catch(console.error);
  };

  return (
    <OnboardingContext.Provider value={{ data, setData, clearData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export { OnboardingProvider, useOnboarding };