import { create } from 'zustand';

type MacroData = {
  protein: number;
  carbs: number;
  fat: number;
};

type AppState = {
  dailyCalories: number;
  macros: MacroData;
  healthScore: number;
  workoutsCompleted: number;
  activeWorkoutDay: string;
  setNutrition: (payload: { calories: number; macros: MacroData; healthScore: number }) => void;
  setWorkoutsCompleted: (count: number) => void;
  setActiveWorkoutDay: (day: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  dailyCalories: 1480,
  macros: { protein: 112, carbs: 146, fat: 48 },
  healthScore: 84,
  workoutsCompleted: 3,
  activeWorkoutDay: 'Monday',
  setNutrition: ({ calories, macros, healthScore }) =>
    set({
      dailyCalories: calories,
      macros,
      healthScore
    }),
  setWorkoutsCompleted: (count) => set({ workoutsCompleted: count }),
  setActiveWorkoutDay: (day) => set({ activeWorkoutDay: day })
}));
