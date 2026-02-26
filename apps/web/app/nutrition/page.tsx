"use client";

import { useAppStore } from '@/store/useAppStore';

export default function NutritionTrackerPage() {
  const { dailyCalories, macros, healthScore } = useAppStore((state) => state);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">Nutrition Tracker</h1>
      <div className="card p-6">
        <p className="text-sm text-muted">Today&apos;s intake</p>
        <p className="mt-2 text-xl font-semibold">{dailyCalories} kcal</p>
        <p className="mt-2 text-sm text-slate-700">
          Protein {macros.protein}g • Carbs {macros.carbs}g • Fat {macros.fat}g
        </p>
        <p className="mt-2 text-sm text-slate-700">Health Score: {healthScore}/100</p>
      </div>
    </section>
  );
}
