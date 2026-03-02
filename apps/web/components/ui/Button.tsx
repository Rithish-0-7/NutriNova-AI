import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  leftIcon?: ReactNode;
};

export function Button({ variant = 'primary', leftIcon, className = '', children, ...props }: ButtonProps) {
  const styles = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={`${styles} ${className}`.trim()} {...props}>
      {leftIcon ? <span aria-hidden>{leftIcon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
