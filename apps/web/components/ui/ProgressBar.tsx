type ProgressBarProps = {
  value: number;
  label: string;
  total?: number;
};

export function ProgressBar({ value, label, total = 100 }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / total) * 100));

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{label}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <progress
        className="h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-brand-gradient [&::-webkit-progress-value]:transition-all dark:[&::-webkit-progress-bar]:bg-slate-700"
        max={total}
        value={value}
        aria-label={`${label} progress`}
      />
    </div>
  );
}
