type PageHeaderProps = {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="section-title text-2xl sm:text-3xl">{title}</h1>
        <p className="section-subtitle mt-1">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}
