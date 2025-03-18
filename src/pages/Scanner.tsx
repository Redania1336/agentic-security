
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { ScannerForm } from '@/components/scanner/ScannerForm';
import { ScanResults } from '@/components/scanner/ScanResults';
import { ScanResult } from '@/types/scanner';
import { Button } from '@/components/ui/button';

const Scanner = () => {
  const location = useLocation();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Check if result was passed from history page
  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setShowForm(false);
    }
  }, [location.state]);

  const handleNewScan = () => {
    setResult(null);
    setShowForm(true);
  };

  return (
    <AppShell>
      <div className="container px-4 md:px-6 py-8">
        {showForm ? (
          <ScannerForm />
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
      </div>
    </AppShell>
  );
};

export default Scanner;
