export type Phase = 'Phase 1' | 'Phase 2';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type WorkoutType = 'Strength' | 'Run' | 'Metcon' | 'Rest' | 'Aerobic';

export interface ExerciseSet {
  sets: string;
  reps: string;
  intensity?: string; // % or notes like "wu"
  weight?: string; // Placeholder for user input
}

export interface Exercise {
  name: string;
  notes?: string;
  tempo?: string;
  // Detailed instruction fields
  instructions?: string[];
  commonMistakes?: string[];
  videoUrl?: string; 
  // Map week number (1-4) to the specific prescription
  weeks: {
    [week: number]: ExerciseSet;
  };
}

export interface WorkoutSection {
  title?: string;
  type: 'Warm Up' | 'Strength' | 'Superset' | 'Circuit' | 'Optional';
  exercises: Exercise[];
  notes?: string;
}

export interface DailyWorkoutPlan {
  id: string;
  title: string;
  type: WorkoutType;
  sections: WorkoutSection[];
}

export interface Metcon {
  name: string;
  type: string; // e.g. "4 Rounds for time", "EMOM 10"
  details: string[];
}

export interface RunPlan {
  type: string; // Option A, B, C
  weeks: {
    [week: number]: string[]; // List of intervals/instructions
  };
}

export interface UserProgress {
  [dateIso: string]: {
    completed: boolean;
    notes?: string;
  };
}

export interface AppState {
  currentPhase: Phase;
  startDate: string; // ISO Date string
}