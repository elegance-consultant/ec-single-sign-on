import { UserPage } from '@/components/ui/users/user-page';
import { cookies } from 'next/headers';

export default async function Page() {
    // Fetch data from your API here.
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
    return <UserPage data={data} />
}

