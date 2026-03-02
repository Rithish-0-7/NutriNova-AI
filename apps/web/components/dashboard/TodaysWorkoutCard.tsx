import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type TodaysWorkoutCardProps = {
  focus: string;
  exercise: string;
  sets: number;
  reps: string;
};

export function TodaysWorkoutCard({ focus, exercise, sets, reps }: TodaysWorkoutCardProps) {
  return (
    <Card title="Today’s Workout" subtitle={focus} action={<Button variant="secondary">Start Workout</Button>}>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{exercise}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {sets} sets × {reps} reps
      </p>
    </Card>
  );
}
