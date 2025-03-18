
import { useState } from 'react';
import { useScanStore } from '@/hooks/useScanStore';
import { ScanResult } from '@/types/scanner';
import { Shield, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanResults } from './ScanResults';

export const ScannerForm = () => {
  const { runScan, loading, currentScan } = useScanStore();
  const [repository, setRepository] = useState('');
  const [branch, setBranch] = useState('main');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [formComplete, setFormComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repository) return;
    
    try {
      const scanResult = await runScan({ repository, branch });
      setResult(scanResult);
      setFormComplete(true);
    } catch (error) {
      console.error('Scan failed:', error);
    }
  };

  const resetForm = () => {
    setFormComplete(false);
    setResult(null);
  };

  if (formComplete && result) {
    return (
      <div className="space-y-8 animate-fade-in">
        <ScanResults result={result} />
        <div className="flex justify-center">
          <Button onClick={resetForm} variant="outline" className="mt-4">
            New Scan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full p-3 bg-primary-blue/10 text-primary-blue mb-4">
          <Shield className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Security Scanner</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Scan your code repository for security vulnerabilities and best practices
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto neo-blur animate-scale-in">
        <CardHeader>
          <CardTitle>Repository Scanner</CardTitle>
          <CardDescription>
            Enter a repository path to analyze its security posture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="repository" className="text-sm font-medium">
                Repository Path
              </label>
              <Input
                id="repository"
                placeholder="owner/repository"
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                required
                className="transition-all duration-300 focus-visible:ring-primary-blue"
              />
              <p className="text-xs text-muted-foreground">
                Example: facebook/react
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="branch" className="text-sm font-medium">
                Branch
              </label>
              <Input
                id="branch"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="transition-all duration-300 focus-visible:ring-primary-blue"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading || !repository}
              className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-pulse">Scanning</span>
                </span>
              ) : (
                <span className="flex items-center">
                  Scan Repository
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-4 border-t pt-4">
          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-orange-500" />
            <p>
              This scanner is for demonstration purposes. No actual repositories will be accessed.
            </p>
          </div>
          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
            <p>
              For a production security scanner, check out GitHub Advanced Security or other commercial solutions.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
