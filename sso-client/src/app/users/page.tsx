import { UserPage } from '@/components/ui/users/user-page';
import { cookies } from 'next/headers';

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">
                    Here's an overview of your business
                </p>
            </div>
            <UserPage data={data} />
        </div>
    )
}
