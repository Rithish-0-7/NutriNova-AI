import { Card } from '@/components/ui/Card';

type ScannerResultCardProps = {
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
};

export function ScannerResultCard({ foods, calories, protein, carbs, fat, healthScore }: ScannerResultCardProps) {
  const items = [
    { label: 'Calories', value: calories },
    { label: 'Protein', value: `${protein}g` },
    { label: 'Carbs', value: `${carbs}g` },
    { label: 'Fat', value: `${fat}g` },
    { label: 'Health Score', value: `${healthScore}/100` }
  ];

  return (
    <Card title="AI Scan Results" subtitle={foods.length ? foods.join(', ') : 'No foods detected'}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="surface-muted p-3">
            <p className="text-xs text-slate-400">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
