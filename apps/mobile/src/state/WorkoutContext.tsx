import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number; // in seconds
  rest: number; // rest time in seconds
  description?: string;
  gifUrl?: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  totalDuration: number; // in minutes
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

const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkout, setCurrentWorkoutState] = useState<WorkoutPlan | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = async () => {
    try {
      const currentJson = await AsyncStorage.getItem('@current_workout');
      const historyJson = await AsyncStorage.getItem('@workout_history');
      
      if (currentJson) setCurrentWorkoutState(JSON.parse(currentJson));
      if (historyJson) setWorkoutHistory(JSON.parse(historyJson));
    } catch (e) {
      console.error('Failed to load workout data', e);
    }
  };

  const setCurrentWorkout = (workout: WorkoutPlan) => {
    setCurrentWorkoutState(workout);
    AsyncStorage.setItem('@current_workout', JSON.stringify(workout)).catch(console.error);
  };

  const addToHistory = (workout: WorkoutPlan) => {
    const newHistory = [workout, ...workoutHistory].slice(0, 50); // Keep last 50 workouts
    setWorkoutHistory(newHistory);
    AsyncStorage.setItem('@workout_history', JSON.stringify(newHistory)).catch(console.error);
  };

  const clearCurrentWorkout = () => {
    setCurrentWorkoutState(null);
    AsyncStorage.removeItem('@current_workout').catch(console.error);
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