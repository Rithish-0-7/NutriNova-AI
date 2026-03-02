"use client";

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-md py-8">
      <PageHeader title="Authentication" subtitle="Secure sign in with JWT and Google OAuth." />
      <Card>
        <div className="space-y-3">
          <Input label="Email" placeholder="name@domain.com" type="email" aria-label="Email" />
          <Input label="Password" placeholder="••••••••" type="password" aria-label="Password" />
          <Button className="w-full">Sign In</Button>
          <Button variant="secondary" className="w-full">Continue with Google</Button>
        </div>
      </Card>
    </div>
  );
}
