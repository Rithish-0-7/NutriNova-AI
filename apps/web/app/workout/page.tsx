"use client";

import { useState } from 'react';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { WorkoutForm } from '@/components/forms/WorkoutForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/store/useAppStore';
import { WeeklyTimeline } from '@/components/workout/WeeklyTimeline';

type WorkoutItem = {
  day: string;
  focus: string;
  exercise: string;
  sets: number;
  reps: string;
  rest_seconds: number;
};

export default function WorkoutPlannerPage() {
  const { activeWorkoutDay, setActiveWorkoutDay } = useAppStore((state) => state);
  const [form, setForm] = useState({
    age: 24,
    weight: 70,
    height: 175,
    fitness_goal: 'muscle_gain',
    experience_level: 'beginner',
    training_days: 4
  });
  const [plan, setPlan] = useState<WorkoutItem[]>([]);
  const [completedSessions, setCompletedSessions] = useState(4);
  const [caloriesBurned, setCaloriesBurned] = useState(1380);
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const generate = async () => {
    const { data } = await api.post('/ai/workout-program', form);
    setPlan(data.schedule || []);
  };

  const visiblePlan = plan.filter((item) => item.day === activeWorkoutDay);

  return (
    <div className="space-y-6">
      <PageHeader title="AI Training Control Center" subtitle="Weekly timeline, structured exercises, completion tracker, and calorie burn signal." />

      <SectionFade className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
        <WorkoutForm form={form} onChange={setForm} onSubmit={generate} />

        <Card title="Workout Completion Tracker" subtitle="This week status">
          <div className="space-y-3">
            <div className="surface-muted p-3">
              <p className="text-xs text-slate-400">Sessions completed</p>
              <p className="mt-1 text-2xl font-semibold text-slate-100">{completedSessions}/7</p>
            </div>
            <div className="surface-muted p-3">
              <p className="text-xs text-slate-400">Calories burned</p>
              <p className="mt-1 text-2xl font-semibold text-cyan">{caloriesBurned} kcal</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setCompletedSessions((value) => Math.min(7, value + 1));
                setCaloriesBurned((value) => value + 320);
              }}
            >
              Log Completed Workout
            </Button>
          </div>
        </Card>
      </SectionFade>

      <SectionFade delay={0.06}>
        <WeeklyTimeline activeDay={activeWorkoutDay} days={weekdays} onSelect={setActiveWorkoutDay} />
      </SectionFade>

      <SectionFade delay={0.1}>
        <div className="grid gap-3">
          {(visiblePlan.length ? visiblePlan : plan).map((item, idx) => (
            <Card key={`${item.day}-${idx}`} title={`${item.day} • ${item.focus}`} subtitle="Exercise Card" className="surface-glow">
              <p className="text-sm font-medium text-slate-100">{item.exercise}</p>
              <p className="mt-1 text-sm text-slate-400">
                Sets/Reps: {item.sets} × {item.reps} • Rest: {item.rest_seconds}s
              </p>
              <div className="mt-3">
                <Button variant="secondary">Start Workout</Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionFade>

      {!plan.length ? (
        <p className="text-sm text-slate-400">Generate a workout program to view weekly exercise cards.</p>
      ) : null}
    </div>
  );
}
