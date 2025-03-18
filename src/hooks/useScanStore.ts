
import { useState, useEffect } from 'react';
import { ScanResult, ScanRequest } from '@/types/scanner';
import { generateMockScanResult, generateMockHistory } from '@/utils/mockData';
import { toast } from 'sonner';

const STORAGE_KEY = 'security-scanner-history';

interface ScanStore {
  history: ScanResult[];
  loading: boolean;
  currentScan: ScanResult | null;
  runScan: (request: ScanRequest) => Promise<ScanResult>;
  clearHistory: () => void;
  deleteResult: (id: string) => void;
}

export const useScanStore = (): ScanStore => {
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);

  // Load history from local storage
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      } else {
        // For demo purposes, initialize with mock data
        const mockHistory = generateMockHistory(3);
        setHistory(mockHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));
      }
    } catch (error) {
      console.error('Failed to load scan history:', error);
      toast.error('Failed to load scan history');
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save scan history:', error);
    }
  }, [history]);

  const runScan = async (request: ScanRequest): Promise<ScanResult> => {
    setLoading(true);
    
    try {
      // For demo purposes, simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock scan result
      const result = generateMockScanResult(request.repository, request.branch);
      
      // Update state
      setCurrentScan(result);
      setHistory(prev => [result, ...prev]);
      toast.success('Security scan completed');
      
      return result;
    } catch (error) {
      console.error('Scan failed:', error);
      toast.error('Security scan failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Scan history cleared');
  };

  const deleteResult = (id: string) => {
    setHistory(prev => prev.filter(result => result.id !== id));
    if (currentScan?.id === id) {
      setCurrentScan(null);
    }
    toast.success('Scan result deleted');
  };

  return {
    history,
    loading,
    currentScan,
    runScan,
    clearHistory,
    deleteResult,
  };
};
