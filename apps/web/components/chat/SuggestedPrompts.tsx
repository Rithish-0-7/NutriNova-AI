type SuggestedPromptsProps = {
  onSelect: (prompt: string) => void;
};

const prompts = [
  'Adjust my macros for fat loss this week',
  'Give me a pre-workout meal recommendation',
  'How do I improve recovery on leg days?'
];

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="rounded-xl border border-cyan/20 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan/45 hover:text-slate-100"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
