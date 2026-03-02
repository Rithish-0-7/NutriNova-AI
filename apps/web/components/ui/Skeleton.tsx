type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulseSoft rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`.trim()} aria-hidden />;
}
