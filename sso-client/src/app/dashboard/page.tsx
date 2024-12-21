import { Card } from '@/components/ui/card';
import {
  ArrowUpRight,
  Users,
  CreditCard,
  Activity,
  DollarSign,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+15.2%',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '12,234',
    change: '+12.2%',
    icon: CreditCard,
  },
  {
    title: 'Active Sessions',
    value: '573',
    change: '+8.1%',
    icon: Activity,
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Here's an overview of your business
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
                <p className="ml-2 text-sm text-emerald-500">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}