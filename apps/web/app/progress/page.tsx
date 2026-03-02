"use client";

import { Trophy } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionFade } from '@/components/layout/SectionFade';
import { Card } from '@/components/ui/Card';

export default function ProgressPage() {
  const goals = [
    { label: 'Strength Goal', value: '78%' },
    { label: 'Body Fat Goal', value: '64%' },
    { label: 'Consistency Goal', value: '86%' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Progress Center" subtitle="Fitness level, streaks, completion rings, and weekly performance score." />

      <SectionFade className="grid gap-4 lg:grid-cols-2">
        <Card title="Fitness Level Progress" subtitle="Current level: Intermediate">
          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-3/4 bg-brand-gradient" aria-hidden />
          </div>
          <p className="mt-2 text-xs text-slate-400">74% to next level</p>
        </Card>

        <Card title="Streak Counter" subtitle="Daily activity streak">
          <div className="flex items-center gap-2 text-slate-100">
            <Trophy className="h-5 w-5 text-emerald" />
            <p className="text-2xl font-semibold">12 days</p>
          </div>
          <p className="mt-2 text-xs text-slate-400">Keep your streak alive with one logged workout today.</p>
        </Card>
      </SectionFade>

      <SectionFade delay={0.08}>
        <Card title="Goal Completion Rings" subtitle="Major objective tracking">
          <div className="grid gap-3 sm:grid-cols-3">
            {goals.map((goal) => (
              <div key={goal.label} className="surface-muted p-3">
                <p className="text-xs text-slate-400">{goal.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{goal.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </SectionFade>

      <SectionFade delay={0.1}>
        <Card title="Weekly Performance Score" subtitle="Composite AI score">
          <p className="text-3xl font-semibold text-cyan">88 / 100</p>
          <p className="mt-2 text-sm text-slate-400">Excellent consistency. Recovery quality improved by 9% vs last week.</p>
        </Card>
      </SectionFade>
    </div>
  );
}
