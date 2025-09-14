import { OnboardingData } from '../state/OnboardingContext';
import { Exercise, WorkoutPlan } from '../state/WorkoutContext';

// Exercise database - in production, this would come from a backend
const exerciseDatabase = {
  beginner: {
    none: [
      { name: 'Bodyweight Squats', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Push-ups (Knee)', defaultSets: 3, defaultReps: 8, rest: 60 },
      { name: 'Walking Lunges', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Plank', defaultSets: 3, defaultDuration: 20, rest: 45 },
      { name: 'Mountain Climbers', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Jumping Jacks', defaultSets: 3, defaultDuration: 30, rest: 45 },
    ],
    dumbbells: [
      { name: 'Dumbbell Squats', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Dumbbell Chest Press', defaultSets: 3, defaultReps: 8, rest: 60 },
      { name: 'Dumbbell Rows', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Dumbbell Shoulder Press', defaultSets: 3, defaultReps: 8, rest: 60 },
      { name: 'Dumbbell Bicep Curls', defaultSets: 3, defaultReps: 10, rest: 45 },
    ],
  },
  intermediate: {
    none: [
      { name: 'Jump Squats', defaultSets: 4, defaultReps: 12, rest: 45 },
      { name: 'Push-ups', defaultSets: 4, defaultReps: 15, rest: 45 },
      { name: 'Bulgarian Split Squats', defaultSets: 3, defaultReps: 12, rest: 60 },
      { name: 'Pike Push-ups', defaultSets: 3, defaultReps: 10, rest: 60 },
      { name: 'Burpees', defaultSets: 4, defaultReps: 10, rest: 60 },
      { name: 'Plank', defaultSets: 3, defaultDuration: 45, rest: 30 },
    ],
    dumbbells: [
      { name: 'Dumbbell Thrusters', defaultSets: 4, defaultReps: 12, rest: 60 },
      { name: 'Dumbbell Romanian Deadlifts', defaultSets: 4, defaultReps: 12, rest: 60 },
      { name: 'Dumbbell Step-ups', defaultSets: 3, defaultReps: 12, rest: 60 },
      { name: 'Dumbbell Clean and Press', defaultSets: 4, defaultReps: 10, rest: 90 },
      { name: 'Renegade Rows', defaultSets: 3, defaultReps: 10, rest: 60 },
    ],
  },
  advanced: {
    none: [
      { name: 'Pistol Squats', defaultSets: 4, defaultReps: 8, rest: 60 },
      { name: 'Diamond Push-ups', defaultSets: 4, defaultReps: 15, rest: 45 },
      { name: 'Plyometric Lunges', defaultSets: 4, defaultReps: 20, rest: 60 },
      { name: 'Handstand Push-ups', defaultSets: 3, defaultReps: 8, rest: 90 },
      { name: 'Muscle-ups', defaultSets: 4, defaultReps: 5, rest: 90 },
    ],
    dumbbells: [
      { name: 'Dumbbell Snatches', defaultSets: 4, defaultReps: 10, rest: 60 },
      { name: 'Turkish Get-ups', defaultSets: 3, defaultReps: 5, rest: 90 },
      { name: 'Dumbbell Complexes', defaultSets: 4, defaultReps: 8, rest: 90 },
      { name: 'Single-leg RDLs', defaultSets: 4, defaultReps: 12, rest: 60 },
    ],
  },
};

export const generateWorkoutPlan = async (userData: OnboardingData): Promise<WorkoutPlan> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const fitnessLevel = (userData.fitnessLevel || 'beginner').toLowerCase();
  const duration = parseInt(userData.workoutDuration || '30');
  const hasEquipment = userData.equipment && userData.equipment.length > 0 && !userData.equipment.includes('None');
  
  // Get appropriate exercise pool
  const exercisePool = exerciseDatabase[fitnessLevel]?.[hasEquipment ? 'dumbbells' : 'none'] || 
                      exerciseDatabase.beginner.none;

  // Calculate number of exercises based on duration
  const exerciseCount = Math.min(
    Math.floor(duration / 7), // Roughly 7 minutes per exercise including rest
    exercisePool.length
  );

  // Randomly select exercises
  const selectedExercises = exercisePool
    .sort(() => Math.random() - 0.5)
    .slice(0, exerciseCount);

  // Build workout plan
  const exercises: Exercise[] = selectedExercises.map((ex, index) => ({
    id: `ex_${index}_${Date.now()}`,
    name: ex.name,
    sets: ex.defaultSets,
    reps: ex.defaultReps,
    duration: ex.defaultDuration,
    rest: ex.rest,
    description: `Perform ${ex.name} with proper form. Focus on controlled movements.`,
  }));

  // Consider user limitations
  if (userData.limitations && userData.limitations.length > 0) {
    // Filter out exercises that might aggravate injuries
    // This is simplified - in production, you'd have a more sophisticated mapping
    const safeExercises = exercises.filter(ex => {
      if (userData.limitations?.includes('Knee') && ex.name.toLowerCase().includes('squat')) {
        return false;
      }
      if (userData.limitations?.includes('Shoulder') && ex.name.toLowerCase().includes('press')) {
        return false;
      }
      return true;
    });
    
    // If we filtered out too many exercises, add some safe alternatives
    if (safeExercises.length < 3) {
      safeExercises.push({
        id: `ex_safe_${Date.now()}`,
        name: 'Walking',
        sets: 1,
        duration: duration * 60, // Convert to seconds
        reps: 0,
        rest: 0,
        description: 'Low-impact cardio alternative',
      });
    }
    
    return {
      id: `workout_${Date.now()}`,
      name: `${userData.goals?.join(' & ') || 'General'} Workout`,
      exercises: safeExercises,
      totalDuration: duration,
      difficulty: fitnessLevel,
      createdAt: new Date(),
    };
  }

  return {
    id: `workout_${Date.now()}`,
    name: `${userData.goals?.join(' & ') || 'General'} Workout`,
    exercises,
    totalDuration: duration,
    difficulty: fitnessLevel,
    createdAt: new Date(),
  };
};

// For future: integrate with OpenAI or other AI service
export const generateAIWorkoutPlan = async (userData: OnboardingData): Promise<WorkoutPlan> => {
  // This would make an API call to your backend which then calls OpenAI
  // For now, we'll use the local generator
  return generateWorkoutPlan(userData);
};