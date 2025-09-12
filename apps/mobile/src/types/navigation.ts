export type RootStackParamList = {
  Welcome: undefined;
  Setup: undefined;
  WorkoutPlan: { 
    level: string; 
    equipment: string; 
    time: string; 
  };
  ExerciseReady: {
    exercise: {
      name: string;
      sets: number;
      reps: number;
      currentSet: number;
    };
  };
  Camera: { 
    exerciseId: string;
    exerciseName: string;
  };
};
