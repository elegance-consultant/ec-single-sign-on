import { Card } from '@/components/ui/card';
// import { BarChart } from '@/components/ui/chart';

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2700 },
  { name: 'Jun', total: 3200 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed analysis of your business performance
        </p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Revenue Over Time</h3>
        <div className="h-[400px]">
          {/* <BarChart data={data} /> */}
        </div>
      </Card>
    </div>
  );
}