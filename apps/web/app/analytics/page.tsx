"use client";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '@/store/useAppStore';

const weightData = [
  { day: 'Mon', weight: 72 },
  { day: 'Tue', weight: 71.8 },
  { day: 'Wed', weight: 71.6 },
  { day: 'Thu', weight: 71.5 },
  { day: 'Fri', weight: 71.3 }
];

export default function AnalyticsPage() {
  const macros = useAppStore((s) => s.macros);
  const macroData = [
    { name: 'Protein', value: macros.protein },
    { name: 'Carbs', value: macros.carbs },
    { name: 'Fat', value: macros.fat }
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Progress Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card h-72 p-4">
          <p className="mb-2 text-sm text-muted">Weight Progress</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#2563EB" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card h-72 p-4">
          <p className="mb-2 text-sm text-muted">Macro Breakdown</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={macroData} dataKey="value" outerRadius={90}>
                <Cell fill="#2563EB" />
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
