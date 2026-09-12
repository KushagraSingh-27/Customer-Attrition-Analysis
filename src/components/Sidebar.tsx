import {
  LayoutDashboard,
  Users,
  TrendingDown,
  ShieldAlert,
  Lightbulb,
  Info,
  X,
} from 'lucide-react';
import type { PageId } from '@/types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'customers', label: 'Customer Analysis', icon: Users },
  { id: 'drivers', label: 'Attrition Drivers', icon: TrendingDown },
  { id: 'segmentation', label: 'Risk Segmentation', icon: ShieldAlert },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'about', label: 'About', icon: Info },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-navy-900 text-navy-100 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo / brand */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">AttritionAnalysis</h1>
              <p className="text-xs text-navy-400">Portfolio Project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-navy-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 px-3">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-navy-500">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-teal-500/15 text-teal-300'
                        : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>
    </>
  );
}
