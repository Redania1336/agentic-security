
import { useState } from 'react';
import { ScanResult, SecurityFinding, SeverityLevel } from '@/types/scanner';
import { AlertCircle, AlertTriangle, Info, Shield, CheckCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScanResultsProps {
  result: ScanResult;
}

export const ScanResults = ({ result }: ScanResultsProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleAccordionItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const getSeverityIcon = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'info':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
    }
  };

  // Filter findings by severity
  const criticalFindings = result.findings.filter(f => f.severity === 'critical');
  const highFindings = result.findings.filter(f => f.severity === 'high');
  const mediumFindings = result.findings.filter(f => f.severity === 'medium');
  const lowFindings = result.findings.filter(f => f.severity === 'low');
  const infoFindings = result.findings.filter(f => f.severity === 'info');

  const hasFindings = result.findings.length > 0;

  // Render finding details content
  const renderFindingDetails = (finding: SecurityFinding) => (
    <div className="space-y-4">
      <p className="text-muted-foreground">{finding.description}</p>
      
      {finding.location && (
        <div>
          <p className="text-sm font-medium mb-1">Location</p>
          <code className="text-xs bg-muted px-2 py-1 rounded">{finding.location}</code>
        </div>
      )}
      
      {finding.codeSnippet && (
        <div>
          <p className="text-sm font-medium mb-1">Code Snippet</p>
          <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{finding.codeSnippet}</pre>
        </div>
      )}
      
      {finding.recommendation && (
        <div className="bg-primary-blue/10 p-3 rounded flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary-blue shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Recommendation</p>
            <p className="text-sm">{finding.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
  
  // Function to render an accordion item
  const renderAccordionItem = (finding: SecurityFinding) => (
    <AccordionItem key={finding.id} value={finding.id} className="neo-blur mb-4 rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-3 text-left">
          {getSeverityIcon(finding.severity)}
          <div>
            <h3 className="font-medium">{finding.title}</h3>
            <Badge variant="outline" className={`${getSeverityColor(finding.severity)} mt-1`}>
              {finding.severity}
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        {renderFindingDetails(finding)}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full p-3 bg-primary-blue/10 text-primary-blue mb-4">
          <Shield className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Scan Results</h1>
        <p className="text-muted-foreground">
          Repository: <span className="font-medium text-foreground">{result.repository}</span>
        </p>
        <p className="text-muted-foreground text-sm">
          Scanned on {new Date(result.timestamp).toLocaleString()}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className={`${result.summary.critical > 0 ? 'border-red-300 dark:border-red-800' : ''}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-medium flex justify-between items-center">
              {result.summary.critical}
              <AlertCircle className={`h-5 w-5 ${result.summary.critical > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
            </CardTitle>
            <CardDescription>Critical</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`${result.summary.high > 0 ? 'border-orange-300 dark:border-orange-800' : ''}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-medium flex justify-between items-center">
              {result.summary.high}
              <AlertTriangle className={`h-5 w-5 ${result.summary.high > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
            </CardTitle>
            <CardDescription>High</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`${result.summary.medium > 0 ? 'border-yellow-300 dark:border-yellow-800' : ''}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-medium flex justify-between items-center">
              {result.summary.medium}
              <AlertTriangle className={`h-5 w-5 ${result.summary.medium > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </CardTitle>
            <CardDescription>Medium</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`${result.summary.low > 0 ? 'border-blue-300 dark:border-blue-800' : ''}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-medium flex justify-between items-center">
              {result.summary.low}
              <Info className={`h-5 w-5 ${result.summary.low > 0 ? 'text-blue-500' : 'text-muted-foreground'}`} />
            </CardTitle>
            <CardDescription>Low</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`${result.summary.info > 0 ? 'border-gray-300 dark:border-gray-700' : ''}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-medium flex justify-between items-center">
              {result.summary.info}
              <Info className={`h-5 w-5 ${result.summary.info > 0 ? 'text-gray-500' : 'text-muted-foreground'}`} />
            </CardTitle>
            <CardDescription>Info</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {hasFindings ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="all">All ({result.findings.length})</TabsTrigger>
            <TabsTrigger value="critical" disabled={criticalFindings.length === 0}>
              Critical ({criticalFindings.length})
            </TabsTrigger>
            <TabsTrigger value="high" disabled={highFindings.length === 0}>
              High ({highFindings.length})
            </TabsTrigger>
            <TabsTrigger value="medium" disabled={mediumFindings.length === 0}>
              Medium ({mediumFindings.length})
            </TabsTrigger>
            <TabsTrigger value="low" disabled={lowFindings.length === 0}>
              Low ({lowFindings.length})
            </TabsTrigger>
            <TabsTrigger value="info" disabled={infoFindings.length === 0}>
              Info ({infoFindings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {result.findings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {criticalFindings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="high" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {highFindings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="medium" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {mediumFindings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="low" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {lowFindings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
              {infoFindings.map(renderAccordionItem)}
            </Accordion>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-medium mb-2">No vulnerabilities found</h3>
            <p className="text-muted-foreground">
              Great job! Your repository passed all security checks.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
