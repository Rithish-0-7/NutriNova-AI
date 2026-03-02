"use client";

import dynamic from 'next/dynamic';
import { Brain, Dumbbell, Flame, HeartPulse, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { TodaysWorkoutCard } from '@/components/dashboard/TodaysWorkoutCard';
import { SuggestionsPanel } from '@/components/dashboard/SuggestionsPanel';
import { useAppStore } from '@/store/useAppStore';

const CalorieProgressChart = dynamic(
  () => import('@/components/charts/CalorieProgressChart').then((mod) => mod.CalorieProgressChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);
const MacroBreakdownChart = dynamic(
  () => import('@/components/charts/MacroBreakdownChart').then((mod) => mod.MacroBreakdownChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);
const TremorReadinessChart = dynamic(
  () => import('@/components/charts/TremorReadinessChart').then((mod) => mod.TremorReadinessChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);

const calorieData = [
  { day: 'Mon', calories: 1680 },
  { day: 'Tue', calories: 1740 },
  { day: 'Wed', calories: 1610 },
  { day: 'Thu', calories: 1820 },
  { day: 'Fri', calories: 1715 },
  { day: 'Sat', calories: 1655 },
  { day: 'Sun', calories: 1580 }
];

export default function DashboardPage() {
  const { dailyCalories, macros, healthScore, workoutsCompleted } = useAppStore((state) => state);
  const cards = [
    { label: 'Calories Today', value: `${dailyCalories}`, icon: Flame },
    { label: 'Protein Intake', value: `${macros.protein}g`, icon: Dumbbell },
    { label: 'Workout Score', value: `${workoutsCompleted * 24}`, icon: HeartPulse },
    { label: 'Health Index', value: `${healthScore}`, icon: ShieldCheck },
    { label: 'AI Readiness', value: `${Math.min(100, healthScore + 6)}`, icon: Brain }
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Analytics Command Center" subtitle="Dark-mode AI fitness operating system for high-density insights." />

      <SectionFade>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="surface-glow transition duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  <Icon className="h-4 w-4 text-cyan" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-100">{item.value}</p>
              </Card>
            );
          })}
        </div>
      </SectionFade>

      <SectionFade delay={0.05} className="grid gap-4 lg:grid-cols-2">
        <Card title="Daily Calorie Trend" subtitle="Animated trendline" className="h-72">
          <CalorieProgressChart data={calorieData} />
        </Card>
        <Card title="Macro Breakdown" subtitle="Doughnut chart" className="h-72">
          <MacroBreakdownChart protein={macros.protein} carbs={macros.carbs} fat={macros.fat} />
        </Card>
      </SectionFade>

      <SectionFade delay={0.1} className="grid gap-4 xl:grid-cols-[1.3fr,0.7fr]">
        <div className="grid gap-4">
          <Card title="AI Readiness Score" subtitle="Tremor powered signal" className="h-64">
            <TremorReadinessChart />
          </Card>
          <TodaysWorkoutCard focus="Chest + Triceps" exercise="Bench Press" sets={4} reps="8-10" />
        </div>
        <SuggestionsPanel />
      </SectionFade>
    </div>
  );
}
