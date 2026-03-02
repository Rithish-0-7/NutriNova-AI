"use client";

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Skeleton } from '@/components/ui/Skeleton';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { MealTimeline } from '@/components/nutrition/MealTimeline';
import { useAppStore } from '@/store/useAppStore';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const CalorieProgressChart = dynamic(
  () => import('@/components/charts/CalorieProgressChart').then((mod) => mod.CalorieProgressChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);

const dailyData = [
  { day: 'Breakfast', calories: 420 },
  { day: 'Lunch', calories: 610 },
  { day: 'Snack', calories: 180 },
  { day: 'Dinner', calories: 360 }
];

const mealCards = [
  { name: 'Oats + Banana Bowl', kcal: 420, macros: 'P 18g • C 63g • F 9g' },
  { name: 'Paneer Rice Plate', kcal: 610, macros: 'P 31g • C 70g • F 21g' },
  { name: 'Greek Yogurt', kcal: 180, macros: 'P 14g • C 12g • F 6g' }
];

const radarData = [
  { nutrient: 'Iron', value: 72 },
  { nutrient: 'B12', value: 68 },
  { nutrient: 'Fiber', value: 83 },
  { nutrient: 'Omega-3', value: 61 },
  { nutrient: 'Calcium', value: 77 }
];

export default function NutritionTrackerPage() {
  const { dailyCalories, macros, healthScore } = useAppStore((state) => state);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nutrition Intelligence"
        subtitle="Meal timeline, macro targets, micronutrient radar, and intake summary."
        action={<Button>Add Meal</Button>}
      />

      <SectionFade className="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <Card title="Meal Timeline" subtitle="Chronological intake log">
          <MealTimeline />
        </Card>

        <Card title="Macro Progress Bars" subtitle={`Health index ${healthScore}/100`}>
          <div className="space-y-4">
            <ProgressBar label="Protein" value={macros.protein} total={160} />
            <ProgressBar label="Carbs" value={macros.carbs} total={250} />
            <ProgressBar label="Fat" value={macros.fat} total={80} />
            <p className="text-xs text-slate-400">Daily total: {dailyCalories} kcal</p>
          </div>
        </Card>
      </SectionFade>

      <SectionFade delay={0.08} className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
        <Card title="Daily Intake Summary" subtitle="Meal energy distribution" className="h-72">
          <CalorieProgressChart data={dailyData} />
        </Card>

        <Card title="Micronutrient Radar" subtitle="Coverage score" className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,0.25)" />
              <PolarAngleAxis dataKey="nutrient" tick={{ fill: '#CBD5E1', fontSize: 12 }} />
              <Radar dataKey="value" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.35} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </SectionFade>

      <SectionFade delay={0.11}>
        <Card title="Meal Cards" subtitle="Quick glance summary">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {mealCards.map((meal) => (
              <article key={meal.name} className="surface-muted p-3">
                <p className="text-sm font-medium text-slate-100">{meal.name}</p>
                <p className="mt-1 text-xs text-slate-400">{meal.kcal} kcal • {meal.macros}</p>
              </article>
            ))}
          </div>
        </Card>
      </SectionFade>
    </div>
  );
}
