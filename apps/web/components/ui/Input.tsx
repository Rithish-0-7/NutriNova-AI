import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-xs font-medium text-slate-300">{label}</span> : null}
      <input id={id} className={`input ${className}`.trim()} {...props} />
    </label>
  );
}
