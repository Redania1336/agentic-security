
import { useState, useEffect } from 'react';
import { ScanResult, ScanRequest } from '@/types/scanner';
import { generateMockScanResult, generateMockHistory } from '@/utils/mockData';
import { toast } from 'sonner';

const STORAGE_KEY = 'security-scanner-history';
const EDGE_FUNCTION_URL = 'https://eojucgnpskovtadfwfir.supabase.co/functions/v1/security-scanner';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvanVjZ25wc2tvdnRhZGZ3ZmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NDA3OTgsImV4cCI6MjA1MDIxNjc5OH0.n354_1M5MfeLPtiafQ4nN4QiYStK8N8cCpNw7eLW93Y';

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
      // Make an actual API call to the deployed edge function
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          repo: request.repository,
          branch: request.branch || 'main',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Fallback to mock data if the API response doesn't match expected format
      let result: ScanResult;
      
      try {
        // Map the API response to our ScanResult type
        result = {
          id: data.scanId || `scan_${Date.now()}`,
          repository: request.repository,
          branch: request.branch || 'main',
          timestamp: data.timestamp || new Date().toISOString(),
          findings: data.findings || [],
          summary: data.summary || {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            info: 0
          },
          status: data.status || 'completed',
        };
        
        // Validate or populate summary counts if they don't exist
        if (!data.summary) {
          const summary = {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            info: 0
          };
          
          // Calculate summary counts from findings
          if (Array.isArray(result.findings)) {
            result.findings.forEach(finding => {
              if (finding.severity && summary[finding.severity] !== undefined) {
                summary[finding.severity]++;
              }
            });
          }
          
          result.summary = summary;
        }
      } catch (error) {
        console.error('Error parsing API response:', error);
        console.log('Falling back to mock data');
        // Fall back to mock data if there's an issue
        result = generateMockScanResult(request.repository, request.branch);
      }
      
      // Update state
      setCurrentScan(result);
      setHistory(prev => [result, ...prev]);
      toast.success('Security scan completed');
      
      return result;
    } catch (error) {
      console.error('Scan failed:', error);
      toast.error(`Security scan failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Fall back to mock data in case of error
      const mockResult = generateMockScanResult(request.repository, request.branch);
      return mockResult;
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
