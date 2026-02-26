"use client";

import { StatCard } from '@/components/StatCard';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardPage() {
  const { dailyCalories, macros, healthScore } = useAppStore((state) => state);

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Daily nutrition and workout intelligence at a glance</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Daily Calories" value={`${dailyCalories} kcal`} />
        <StatCard label="Protein" value={`${macros.protein} g`} />
        <StatCard label="Carbs" value={`${macros.carbs} g`} />
        <StatCard label="Health Score" value={`${healthScore}/100`} />
      </div>
    </section>
  );
}
