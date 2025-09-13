export type RootStackParamList = {
  Welcome: undefined;
  Setup: undefined;
  OnboardingGoals: undefined;
  OnboardingProfile: undefined;
  OnboardingLimitations: undefined;
  OnboardingEquipment: undefined;
  OnboardingSchedule: undefined;
  WorkoutPlan: { 
    level: string; 
    equipment: string; 
    time: string;
    goal?: string;
    limitations?: string[];
    profile?: {
      weight?: number;
      height?: number;
      age?: number;
      gender?: string;
    };
    schedule?: {
      daysPerWeek?: number;
      preferredTime?: string;
    };
  };
  Home: undefined;
  Camera: undefined;
  ExerciseReady: {
    exercise: {
      name: string;
      sets: number;
      reps: number;
      currentSet: number;
    };
  };
};
