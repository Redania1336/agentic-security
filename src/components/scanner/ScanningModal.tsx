
import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface ScanningModalProps {
  isOpen: boolean;
  status: 'scanning' | 'success' | 'error';
  repository: string;
}

export const ScanningModal = ({ isOpen, status, repository }: ScanningModalProps) => {
  // Force dialog to be open when isOpen is true
  const open = isOpen;
  
  return (
    <Dialog open={open} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {status === 'scanning' && 'Security Scan in Progress'}
            {status === 'success' && 'Security Scan Complete'}
            {status === 'error' && 'Security Scan Failed'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="relative">
            {status === 'scanning' && (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-primary-blue animate-pulse" />
                </div>
                <div className="h-20 w-20 rounded-full border-4 border-t-primary-blue border-b-primary-blue animate-spin opacity-30"></div>
              </>
            )}
            
            {status === 'success' && (
              <div className="rounded-full bg-green-100 p-3 animate-scale-in">
                <Shield className="h-16 w-16 text-green-600" />
              </div>
            )}
            
            {status === 'error' && (
              <div className="rounded-full bg-red-100 p-3 animate-scale-in">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-medium">
              {status === 'scanning' && `Scanning ${repository}`}
              {status === 'success' && 'Analysis complete'}
              {status === 'error' && 'An error occurred'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {status === 'scanning' && 'Analyzing code, dependencies, and security patterns...'}
              {status === 'success' && 'Redirecting to results...'}
              {status === 'error' && 'Please try again later'}
            </p>
          </div>
          
          {status === 'scanning' && (
            <div className="w-full max-w-xs">
              <Progress value={undefined} className="animate-pulse" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
