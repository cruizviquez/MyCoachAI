import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  rest: number;
  description?: string;
  gifUrl?: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  totalDuration: number;
  difficulty: string;
  createdAt: Date;
}

interface WorkoutContextProps {
  currentWorkout: WorkoutPlan | null;
  workoutHistory: WorkoutPlan[];
  setCurrentWorkout: (workout: WorkoutPlan) => void;
  addToHistory: (workout: WorkoutPlan) => void;
  clearCurrentWorkout: () => void;
}

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

const WORKOUT_KEY = 'current_workout';
const HISTORY_KEY = 'workout_history';

const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkout, setCurrentWorkoutState] = useState<WorkoutPlan | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = async () => {
    try {
      const currentJson = await SecureStore.getItemAsync(WORKOUT_KEY);
      const historyJson = await SecureStore.getItemAsync(HISTORY_KEY);
      
      if (currentJson) setCurrentWorkoutState(JSON.parse(currentJson));
      if (historyJson) setWorkoutHistory(JSON.parse(historyJson));
    } catch (e) {
      console.error('Failed to load workout data', e);
    }
  };

  const setCurrentWorkout = (workout: WorkoutPlan) => {
    setCurrentWorkoutState(workout);
    SecureStore.setItemAsync(WORKOUT_KEY, JSON.stringify(workout)).catch(console.error);
  };

  const addToHistory = (workout: WorkoutPlan) => {
    const newHistory = [workout, ...workoutHistory].slice(0, 50);
    setWorkoutHistory(newHistory);
    SecureStore.setItemAsync(HISTORY_KEY, JSON.stringify(newHistory)).catch(console.error);
  };

  const clearCurrentWorkout = () => {
    setCurrentWorkoutState(null);
    SecureStore.deleteItemAsync(WORKOUT_KEY).catch(console.error);
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        workoutHistory,
        setCurrentWorkout,
        addToHistory,
        clearCurrentWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkout = () => {
  const context = React.useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export { WorkoutProvider, useWorkout };
export type { Exercise, WorkoutPlan };