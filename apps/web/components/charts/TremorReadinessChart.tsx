"use client";

import { AreaChart } from '@tremor/react';

const data = [
  { day: 'Mon', score: 74 },
  { day: 'Tue', score: 79 },
  { day: 'Wed', score: 77 },
  { day: 'Thu', score: 83 },
  { day: 'Fri', score: 86 },
  { day: 'Sat', score: 84 },
  { day: 'Sun', score: 88 }
];

export function TremorReadinessChart() {
  return (
    <AreaChart
      className="h-full"
      data={data}
      index="day"
      categories={['score']}
      colors={['emerald']}
      showLegend={false}
      showGridLines={false}
      yAxisWidth={36}
      valueFormatter={(value) => `${value}`}
    />
  );
}
