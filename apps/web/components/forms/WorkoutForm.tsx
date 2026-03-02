"use client";

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type WorkoutPayload = {
  age: number;
  weight: number;
  height: number;
  fitness_goal: string;
  experience_level: string;
  training_days: number;
};

type WorkoutFormProps = {
  form: WorkoutPayload;
  onChange: (next: WorkoutPayload) => void;
  onSubmit: () => void;
};

export function WorkoutForm({ form, onChange, onSubmit }: WorkoutFormProps) {
  return (
    <div className="surface grid gap-3 p-5 sm:grid-cols-2">
      <Input label="Fitness Goal" value={form.fitness_goal} onChange={(event) => onChange({ ...form, fitness_goal: event.target.value })} />
      <Input label="Experience" value={form.experience_level} onChange={(event) => onChange({ ...form, experience_level: event.target.value })} placeholder="beginner / intermediate / advanced" />
      <Input label="Training Days" type="number" value={form.training_days} onChange={(event) => onChange({ ...form, training_days: Number(event.target.value) })} />
      <Input label="Age" type="number" value={form.age} onChange={(event) => onChange({ ...form, age: Number(event.target.value) })} />
      <Input label="Weight (kg)" type="number" value={form.weight} onChange={(event) => onChange({ ...form, weight: Number(event.target.value) })} />
      <Input label="Height (cm)" type="number" value={form.height} onChange={(event) => onChange({ ...form, height: Number(event.target.value) })} />
      <div className="sm:col-span-2">
        <Button onClick={onSubmit}>Generate Program</Button>
      </div>
    </div>
  );
}
