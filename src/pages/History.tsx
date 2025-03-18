
import { AppShell } from '@/components/layout/AppShell';
import { ScanHistory } from '@/components/scanner/ScanHistory';

const History = () => {
  return (
    <AppShell>
      <div className="container px-4 md:px-6 py-8">
        <ScanHistory />
      </div>
    </AppShell>
  );
};

export default History;
