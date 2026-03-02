import { Card } from '@/components/ui/Card';

type StatsGridProps = {
  calories: number;
  protein: number;
  workouts: number;
  healthScore: number;
};

export function StatsGrid({ calories, protein, workouts, healthScore }: StatsGridProps) {
  const items = [
    { label: 'Calories Consumed', value: `${calories} kcal` },
    { label: 'Protein Intake', value: `${protein} g` },
    { label: 'Workout Completed', value: `${workouts}` },
    { label: 'Health Score', value: `${healthScore}/100` }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="transition hover:scale-[1.01]">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
