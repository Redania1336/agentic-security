
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useScanStore } from '@/hooks/useScanStore';
import { AppShell } from '@/components/layout/AppShell';
import { ScannerForm } from '@/components/scanner/ScannerForm';
import { ScanResults } from '@/components/scanner/ScanResults';
import { ScanResult } from '@/types/scanner';
import { Button } from '@/components/ui/button';
import { ScanningModal } from '@/components/scanner/ScanningModal';

const Scanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentScan, loading } = useScanStore();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [scanningStatus, setScanningStatus] = useState<'scanning' | 'success' | 'error'>('scanning');
  const [repository, setRepository] = useState('');

  // Check if result was passed from history page
  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setShowForm(false);
    } else if (currentScan) {
      setResult(currentScan);
      setShowForm(false);
    }
  }, [location.state, currentScan]);

  // Handle loading state changes
  useEffect(() => {
    if (loading) {
      setScanningStatus('scanning');
    } else if (currentScan && !showForm) {
      setScanningStatus('success');
      // Small delay to show the success state before redirecting
      const timer = setTimeout(() => {
        setShowForm(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, currentScan, showForm]);

  const handleNewScan = () => {
    setResult(null);
    setShowForm(true);
  };

  const handleScanStart = (repo: string) => {
    setRepository(repo);
  };

  return (
    <AppShell>
      <div className="container px-4 md:px-6 py-8">
        {showForm ? (
          <ScannerForm onScanStart={handleScanStart} />
        ) : (
          <div className="space-y-8 animate-fade-in">
            <ScanResults result={result as ScanResult} />
            <div className="flex justify-center">
              <Button onClick={handleNewScan} variant="outline" className="mt-4">
                New Scan
              </Button>
            </div>
          </div>
        )}
        
        <ScanningModal 
          isOpen={loading} 
          status={scanningStatus}
          repository={repository}
        />
      </div>
    </AppShell>
  );
};

export default Scanner;
