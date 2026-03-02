"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type MacroBreakdownChartProps = {
  protein: number;
  carbs: number;
  fat: number;
};

export function MacroBreakdownChart({ protein, carbs, fat }: MacroBreakdownChartProps) {
  const data = [
    { name: 'Protein', value: protein },
    { name: 'Carbs', value: carbs },
    { name: 'Fat', value: fat }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={82} innerRadius={56}>
          <Cell fill="#10B981" />
          <Cell fill="#2563EB" />
          <Cell fill="#F59E0B" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
