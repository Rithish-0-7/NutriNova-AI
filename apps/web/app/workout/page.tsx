"use client";

import { useState } from 'react';
import { api } from '@/lib/api';

type WorkoutItem = {
  day: string;
  focus: string;
  exercise: string;
  sets: number;
  reps: string;
  rest_seconds: number;
};

export default function WorkoutPlannerPage() {
  const [form, setForm] = useState({
    age: 24,
    weight: 70,
    height: 175,
    fitness_goal: 'muscle_gain',
    experience_level: 'beginner',
    training_days: 4
  });
  const [plan, setPlan] = useState<WorkoutItem[]>([]);

  const generate = async () => {
    const { data } = await api.post('/ai/workout-program', form);
    setPlan(data.schedule || []);
  };

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold text-slate-900">Workout Planner</h1>
      <div className="card p-6 space-y-3">
        <input className="input" value={form.fitness_goal} onChange={(e) => setForm({ ...form, fitness_goal: e.target.value })} placeholder="Goal" />
        <input className="input" value={form.experience_level} onChange={(e) => setForm({ ...form, experience_level: e.target.value })} placeholder="beginner/intermediate/advanced" />
        <input className="input" type="number" value={form.training_days} onChange={(e) => setForm({ ...form, training_days: Number(e.target.value) })} placeholder="Training days" />
        <button className="btn-primary" onClick={generate}>Generate Program</button>
      </div>
      <div className="grid gap-3">
        {plan.map((item, idx) => (
          <div key={`${item.day}-${idx}`} className="card p-4">
            <p className="font-semibold text-slate-900">{item.day}: {item.focus}</p>
            <p className="text-sm text-slate-600">
              {item.exercise} — {item.sets} sets x {item.reps} reps, rest {item.rest_seconds}s
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
