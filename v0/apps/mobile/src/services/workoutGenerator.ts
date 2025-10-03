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

  // Personalization logic
  const fitnessLevel = (userData.fitnessLevel || 'beginner').toLowerCase();
  const duration = parseInt(userData.workoutDuration || '30');
  const hasEquipment = userData.equipment && userData.equipment.length > 0 && !userData.equipment.includes('None');
  const age = userData.age || 25;
  const gender = userData.gender || 'male';
  const bmi = userData.bmi || null;
  const daysPerWeek = userData.schedule?.daysPerWeek || 3;
  const preferredTime = userData.schedule?.preferredTime || 'morning';

  // Get appropriate exercise pool
  let exercisePool: any[] = (exerciseDatabase as any)[fitnessLevel]?.[hasEquipment ? 'dumbbells' : 'none'] || exerciseDatabase.beginner.none;

  // Personalize for age: if age > 50, avoid high-impact moves
  if (age > 50) {
    exercisePool = exercisePool.filter((ex: any) => !ex.name.toLowerCase().includes('jump'));
  }

  // Personalize for gender (example: could add more gender-specific logic)
  if (gender === 'female') {
    // Example: prioritize lower body or core, or just leave as is
    // (No-op for now, but placeholder for future logic)
  }

  // Personalize for BMI: if BMI > 30, prioritize low-impact cardio
  if (bmi && bmi > 30) {
    exercisePool = exercisePool.filter((ex: any) => !ex.name.toLowerCase().includes('jump'));
    // Optionally, add more walking or plank variations
  }

  // Calculate number of exercises based on duration and days/week
  const exerciseCount = Math.min(
    Math.floor(duration / 7), // Roughly 7 minutes per exercise including rest
    exercisePool.length
  );

  // Randomly select exercises
  const selectedExercises = exercisePool
    .sort(() => Math.random() - 0.5)
    .slice(0, exerciseCount);

  // Build workout plan
  let exercises: Exercise[] = selectedExercises.map((ex: any, index: number) => ({
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
    const safeExercises = exercises.filter(ex => {
      if (userData.limitations?.some(lim => lim.toLowerCase().includes('knee')) && ex.name.toLowerCase().includes('squat')) {
        return false;
      }
      if (userData.limitations?.some(lim => lim.toLowerCase().includes('shoulder')) && ex.name.toLowerCase().includes('press')) {
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
    exercises = safeExercises;
  }

  // Optionally, use schedule to build a weekly plan (future enhancement)
  // For now, just include daysPerWeek and preferredTime in the plan name
  const planName = `${userData.goals?.join(' & ') || 'General'} Workout (${daysPerWeek}x/week, ${preferredTime})`;

  return {
    id: `workout_${Date.now()}`,
    name: planName,
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