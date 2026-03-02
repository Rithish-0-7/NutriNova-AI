import { Card } from '@/components/ui/Card';

const suggestions = [
  'Add 20-25g protein in your next meal to hit target.',
  'Hydration reminder: target 2.8L by evening.',
  'A light 15-minute walk post meal can improve glucose response.'
];

export function SuggestionsPanel() {
  return (
    <Card title="AI Suggestions" subtitle="Updated in real time">
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {suggestions.map((tip) => (
          <li key={tip} className="surface-muted p-3">
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  );
}
