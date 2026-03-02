type WeeklyTimelineProps = {
  activeDay: string;
  days: string[];
  onSelect: (day: string) => void;
};

export function WeeklyTimeline({ activeDay, days, onSelect }: WeeklyTimelineProps) {
  return (
    <div className="surface overflow-x-auto p-2">
      <div className="flex min-w-max gap-2">
        {days.map((day) => (
          <button
            key={day}
            className={`rounded-xl px-3 py-2 text-sm transition ${
              activeDay === day ? 'bg-brand-gradient text-white shadow-glow' : 'bg-slate-900/60 text-slate-300 hover:text-slate-100'
            }`}
            onClick={() => onSelect(day)}
            aria-label={`Select ${day}`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}
