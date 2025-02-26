import { UserPage } from '@/components/ui/users/user-page';
import { cookies } from 'next/headers';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | number | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
        throw new Error('Session token is missing');
    }

    const params = await Promise.resolve(searchParams);
    const { page: pageParam, pageSize: pageSizeParam, search: searchParam, q: nationalIDCardParam, q: phoneParam, searchType: searchTypeParam } = params;

    const page = pageParam || 1;
    const pageSize = pageSizeParam || 10;
    const search = searchParam || '';
    const searchType = searchTypeParam || 'name-email';
    const nationalIDCard = nationalIDCardParam || '';
    const phone = phoneParam || '';
    const first = (Number(page) - 1) * Number(pageSize);
    const max = pageSize;

    const keycloakHost = process.env.KEYCLOAK_HOST;
    const keycloakRealm = process.env.KEYCLOAK_REALMS;

    if (!keycloakHost || !keycloakRealm) {
        throw new Error('Keycloak host or realm is not configured');
    }

    let usersUrl = `${keycloakHost}/admin/realms/${keycloakRealm}/users?first=${first}&max=${max}`;
    const countUrl = `${keycloakHost}/admin/realms/${keycloakRealm}/users/count`;

    if (searchType === 'name-email' && search) {
        usersUrl += `&search=${encodeURIComponent(search.toString())}`;
    } else if (searchType === 'national-id' && nationalIDCard) {
        usersUrl += `&q=NationalIDCard:${encodeURIComponent(nationalIDCard.toString())}`;
    } else if (searchType === 'phone' && phone) {
        usersUrl += `&q=Telephone:${encodeURIComponent(phone.toString())}`;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const [usersResponse, totalUsersResponse] = await Promise.all([
            fetch(usersUrl, { method: 'GET', headers }),
            fetch(countUrl, { method: 'GET', headers })
        ]);

        if (!usersResponse.ok || !totalUsersResponse.ok) {
            throw new Error('Failed to fetch user data');
        }

        const [data, totalUsers] = await Promise.all([
            usersResponse.json(),
            totalUsersResponse.json()
        ]);

        const totalPages = Math.ceil(totalUsers / Number(pageSize));

        return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        Here's an overview of your business
                    </p>
                </div>
                <UserPage data={data} totalUsers={totalUsers} totalPages={totalPages} page={Number(page)} pageSize={Number(pageSize)} search={search.toString()} nationalIDCard={nationalIDCard.toString()} searchType={searchType.toString()} phone={phone.toString()} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
        return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        An error occurred while fetching user data.
                    </p>
                </div>
            </div>
        );
    }
}