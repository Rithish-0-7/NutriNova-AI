"use client";

import Link from 'next/link';
import { Bell, Flame, Mic, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

const mobileLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/scanner', label: 'Scanner' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/workout', label: 'Workout' }
];

export function Topbar() {
  return (
    <div className="mb-6 space-y-3">
      <header className="surface-glow flex items-center gap-3 p-3">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-10" placeholder="Search meals, plans, insights..." aria-label="Search" />
        </label>

        <button className="btn-secondary px-3" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </button>

        <div className="surface-muted hidden items-center gap-2 px-3 py-2 text-xs text-slate-200 sm:flex">
          <Flame className="h-4 w-4 text-emerald" />
          <span>12-day streak</span>
        </div>

        <button className="btn-secondary hidden px-3 sm:inline-flex" aria-label="Voice input">
          <Mic className="h-4 w-4" />
        </button>

        <Avatar name="Nova User" />
      </header>

      <nav className="surface-glow flex gap-2 overflow-x-auto p-2 lg:hidden" aria-label="Mobile quick navigation">
        {mobileLinks.map((link) => (
          <Link key={link.href} href={link.href} className="btn-secondary whitespace-nowrap px-3 py-1.5 text-xs">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
