import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex max-w-[1600px] gap-4 px-4 py-4 sm:px-6">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <div className="animate-floatIn">{children}</div>
      </div>
    </div>
  );
}
