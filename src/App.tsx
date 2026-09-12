import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeProvider';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { OverviewPage } from '@/pages/OverviewPage';
import { CustomerAnalysisPage } from '@/pages/CustomerAnalysisPage';
import { AttritionDriversPage } from '@/pages/AttritionDriversPage';
import { RiskSegmentationPage } from '@/pages/RiskSegmentationPage';
import { InsightsPage } from '@/pages/InsightsPage';
import { AboutPage } from '@/pages/AboutPage';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { loadCustomers } from '@/data/dataService';
import type { Customer, PageId } from '@/types';

function App() {
  const [page, setPage] = useState<PageId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = () => {
    setLoading(true);
    setError(false);
    try {
      // >>> MOCK DATA — see src/data/dataService.ts for instructions <<<
      const data = loadCustomers();
      setCustomers(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (p: PageId) => {
    setPage(p);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (loading) return <LoadingState message="Loading customer data…" />;
    if (error)
      return <ErrorState onRetry={loadData} />;
    switch (page) {
      case 'overview':
        return <OverviewPage customers={customers} onNavigate={handleNavigate} />;
      case 'customers':
        return <CustomerAnalysisPage customers={customers} />;
      case 'drivers':
        return <AttritionDriversPage customers={customers} />;
      case 'segmentation':
        return <RiskSegmentationPage customers={customers} />;
      case 'insights':
        return <InsightsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <OverviewPage customers={customers} onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy-50 dark:bg-navy-950">
        <Sidebar
          currentPage={page}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="lg:pl-64">
          <Header currentPage={page} onMenuClick={() => setSidebarOpen(true)} />
          <main className="px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{renderPage()}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
