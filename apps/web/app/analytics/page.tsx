"use client";

import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAppStore } from '@/store/useAppStore';

const TrendLineChart = dynamic(
  () => import('@/components/charts/TrendLineChart').then((mod) => mod.TrendLineChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);
const CalorieProgressChart = dynamic(
  () => import('@/components/charts/CalorieProgressChart').then((mod) => mod.CalorieProgressChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);
const MacroBreakdownChart = dynamic(
  () => import('@/components/charts/MacroBreakdownChart').then((mod) => mod.MacroBreakdownChart),
  { ssr: false, loading: () => <Skeleton className="h-full" /> }
);

const weightData = [
  { day: 'Mon', value: 72 },
  { day: 'Tue', value: 71.8 },
  { day: 'Wed', value: 71.6 },
  { day: 'Thu', value: 71.4 },
  { day: 'Fri', value: 71.2 }
];

const caloriesData = [
  { day: 'Mon', calories: 1720 },
  { day: 'Tue', calories: 1640 },
  { day: 'Wed', calories: 1780 },
  { day: 'Thu', calories: 1690 },
  { day: 'Fri', calories: 1610 },
  { day: 'Sat', calories: 1660 },
  { day: 'Sun', calories: 1570 }
];

const heatmap = [
  [1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0]
];

export default function AnalyticsPage() {
  const macros = useAppStore((s) => s.macros);

  return (
    <div className="space-y-6">
      <PageHeader title="Data Intelligence Center" subtitle="Weight, calories, consistency heatmap, and nutrition analytics." />
      <SectionFade className="grid gap-4 md:grid-cols-2">
        <Card title="Weight Progress Line" className="h-72">
          <TrendLineChart data={weightData} stroke="#10B981" />
        </Card>
        <Card title="Calories History" className="h-72">
          <CalorieProgressChart data={caloriesData} />
        </Card>
        <Card title="Workout Consistency Heatmap" subtitle="Higher intensity = brighter cell" className="h-72">
          <div className="grid h-full gap-2 py-2">
            {heatmap.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-2">
                {row.map((value, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`rounded-lg ${value ? 'bg-cyan/75 shadow-glow' : 'bg-slate-800'}`}
                    aria-label={`Heatmap cell ${rowIndex + 1}-${colIndex + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </Card>
        <Card title="Nutrition Score" className="h-72">
          <MacroBreakdownChart protein={macros.protein} carbs={macros.carbs} fat={macros.fat} />
        </Card>
      </SectionFade>
    </div>
  );
}
