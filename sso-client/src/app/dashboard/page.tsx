import DisplayUser from '@/components/display-user';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Users, UserX, Activity } from 'lucide-react'; // Import necessary icons

export default async function Page() {
    // Placeholder data - Replace with actual data fetching logic
    const stats = [
        {
            title: 'Total Users',
            value: 5567,
            change: '+20.1%',
            icon: Users,
        },
        {
            title: 'Active Users',
            value: 2350,
            change: '-15.2%', // Note the negative sign
            icon: Users, // Or a different icon if you have one for active users
        },
        {
            title: 'Blacklist User',
            value: 234,
            change: '+12.2%',
            icon: UserX, // Use an icon that represents blacklisted users
        },
        {
            title: 'Active Sessions',
            value: 573,
            change: '+8.19%',
            icon: Activity,
        },
    ];

    return (
        <div className="space-y-8 py-6 pr-6">
            <div className="grid grid-cols-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Here's an overview of your business</p>
                </div>
                <div className="justify-self-end">
                    <DisplayUser />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                            <ArrowUpRight className="h-4 w-4 text-emerald-500" /> {/* Always green arrow? */}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <div className="flex items-baseline">
                                <h3 className="text-2xl font-semibold">{stat.value}</h3>
                                <p className={`ml-2 text-sm ${stat.change.startsWith('-') ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}