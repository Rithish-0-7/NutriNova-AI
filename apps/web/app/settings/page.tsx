"use client";

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure profile, goals, and integration preferences." />

      <Card title="Profile">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Name" defaultValue="Nova User" />
          <Input label="Email" defaultValue="nova@nutrinova.ai" />
          <Input label="Primary Goal" defaultValue="Muscle gain" />
          <Input label="Training Days" defaultValue="5" />
        </div>
      </Card>

      <Card title="AI Preferences" subtitle="Model behavior controls">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Coach Tone" defaultValue="Professional" />
          <Input label="Scan Detail" defaultValue="High" />
        </div>
        <div className="mt-4">
          <Button>Save Settings</Button>
        </div>
      </Card>
    </div>
  );
}
