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
  Dashboard: undefined;
  VisionCoachScreen: {
    workout: {
      name: string;
      sets: number;
      reps: number;
      // Add more fields as needed
    };
  };
  Results: {
    workout: {
      name: string;
      sets: number;
      reps: number;
    };
    performance: {
      totalReps: number;
      avgForm: number;
    };
  };
};
