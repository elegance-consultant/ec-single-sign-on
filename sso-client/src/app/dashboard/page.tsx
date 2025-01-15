import { Card } from '@/components/ui/card';
import { ArrowUpRight, Users, User, UserX } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    const resUserCount = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const userCount = await resUserCount.json();

    const resUserCountEnabled = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/count?enabled=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const enabledCount = await resUserCountEnabled.json();

    const resUserCountUnEnabled = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/count?enabled=false`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const unEnabledCount = await resUserCountUnEnabled.json();

    const resClientSessionCount = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/clients/${process.env.KEYCLOAK_CLIENT_UUID}/session-count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const ObjclientSessionCount = await resClientSessionCount.json();
    const { count } = ObjclientSessionCount;
    const clientSessionCount = count;
    
    const stats = [
        {
            title: 'Total Users',
            value: userCount || '0',
            change: `+${userCount / 100}%`,
            icon: Users,
        },
        {
            title: 'Active Users',
            value: enabledCount || '0',
            change: `+${enabledCount / 100}%`,
            icon: User,
        },
        {
            title: 'Blacklist User',
            value: unEnabledCount || '0',
            change: `+${unEnabledCount / 100}%`,
            icon: UserX,
        },
        {
            title: 'Online',
            value: clientSessionCount - 1,
            change: `+${(clientSessionCount -1) / 100}%`,
            icon: Users,
        },
        // {
        //     title: 'Active Sessions',
        //     value: 573,
        //     change: '+8.19%',
        //     icon: Activity,
        // },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Here's an overview of your business</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Chart */}
            </div>
        </div>
    );
}