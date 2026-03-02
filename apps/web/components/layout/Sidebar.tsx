"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Bot,
  Dumbbell,
  Gauge,
  LayoutDashboard,
  LineChart,
  ScanLine,
  Settings,
  UtensilsCrossed
} from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scanner', label: 'AI Scanner', icon: ScanLine },
  { href: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/coach', label: 'AI Coach', icon: Bot },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/progress', label: 'Progress', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="surface-glow sticky top-4 hidden h-[calc(100vh-2rem)] w-72 shrink-0 flex-col overflow-y-auto p-4 lg:flex">
      <Link href="/dashboard" className="mb-4 flex items-center gap-3 rounded-xl border border-cyan/20 bg-slate-900/60 p-3">
        <div className="rounded-lg bg-brand-gradient p-2 text-white">
          <Gauge className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">NutriNova AI</p>
          <p className="text-xs text-slate-400">Fitness Operating System</p>
        </div>
      </Link>

      <nav className="space-y-1" aria-label="Sidebar navigation">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`.trim()}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
