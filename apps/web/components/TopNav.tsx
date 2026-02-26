import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/scanner', label: 'Scanner' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/workout', label: 'Workout' },
  { href: '/coach', label: 'AI Coach' },
  { href: '/analytics', label: 'Analytics' }
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight text-slate-900">
          NutriNova AI
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/auth" className="btn-primary">
          Sign In
        </Link>
      </div>
    </header>
  );
}
