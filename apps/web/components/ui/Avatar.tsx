type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white" aria-label={`Profile avatar for ${name}`}>
      {initials}
    </div>
  );
}
