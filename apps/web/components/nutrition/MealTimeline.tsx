const timeline = [
  { time: '08:00', meal: 'Protein Oats + Banana', kcal: 430 },
  { time: '13:00', meal: 'Paneer Rice Bowl', kcal: 610 },
  { time: '17:00', meal: 'Greek Yogurt', kcal: 190 },
  { time: '20:30', meal: 'Egg Salad Wrap', kcal: 360 }
];

export function MealTimeline() {
  return (
    <div className="space-y-2">
      {timeline.map((item) => (
        <article key={`${item.time}-${item.meal}`} className="surface-muted flex items-center justify-between p-3">
          <div>
            <p className="text-xs text-slate-400">{item.time}</p>
            <p className="text-sm text-slate-100">{item.meal}</p>
          </div>
          <p className="text-sm font-medium text-cyan">{item.kcal} kcal</p>
        </article>
      ))}
    </div>
  );
}
