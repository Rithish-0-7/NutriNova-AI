"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Point = { day: string; calories: number };

type CalorieProgressChartProps = {
  data: Point[];
};

export function CalorieProgressChart({ data }: CalorieProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="calories" stroke="#2563EB" fill="#93C5FD" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
