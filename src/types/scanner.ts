
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface SecurityFinding {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  codeSnippet?: string;
  location?: string;
  recommendation?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface ScanResult {
  id: string;
  repository: string;
  branch: string;
  timestamp: string;
  findings: SecurityFinding[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  status: 'completed' | 'failed' | 'in-progress';
}

export interface ScanRequest {
  repository: string;
  branch?: string;
  useWebSearch?: boolean;
  sendReport?: boolean;
  recipient?: string;
  createIssues?: boolean;
  includeRecommendations?: boolean;
  scanDepth?: number;
  fileTypes?: string[];
  scanHistory?: boolean;
}
