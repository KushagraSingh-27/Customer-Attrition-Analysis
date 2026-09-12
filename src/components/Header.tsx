import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { PageId } from '@/types';

interface HeaderProps {
  currentPage: PageId;
  onMenuClick: () => void;
}

const pageTitles: Record<PageId, { title: string; subtitle: string }> = {
  overview: {
    title: 'Customer Attrition Analysis',
    subtitle: 'Exploring attrition drivers and customer retention opportunities.',
  },
  customers: {
    title: 'Customer Analysis',
    subtitle: 'Search, filter, and explore individual customer records.',
  },
  drivers: {
    title: 'Attrition Drivers',
    subtitle: 'Interactive visualizations of the key factors behind attrition.',
  },
  segmentation: {
    title: 'Risk Segmentation',
    subtitle: 'Exploratory, rule-based customer risk segments.',
  },
  insights: {
    title: 'Business Insights',
    subtitle: 'Findings, implications, and retention recommendations.',
  },
  about: {
    title: 'About',
    subtitle: 'What this dashboard does and the features it offers.',
  },
};

export function Header({ currentPage, onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { title, subtitle } = pageTitles[currentPage];

  return (
    <header className="sticky top-0 z-20 border-b border-navy-200 bg-white/90 backdrop-blur-sm dark:border-navy-800 dark:bg-navy-900/90">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-navy-600 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-navy-900 dark:text-white lg:text-xl">
              {title}
            </h2>
            <p className="hidden text-sm text-navy-500 dark:text-navy-300 sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-navy-600 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
