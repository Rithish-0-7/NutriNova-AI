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
  setNutrition: (payload: { calories: number; macros: MacroData; healthScore: number }) => void;
};

export const useAppStore = create<AppState>((set) => ({
  dailyCalories: 0,
  macros: { protein: 0, carbs: 0, fat: 0 },
  healthScore: 0,
  setNutrition: ({ calories, macros, healthScore }) =>
    set({
      dailyCalories: calories,
      macros,
      healthScore
    })
}));
