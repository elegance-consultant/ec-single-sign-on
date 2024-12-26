import { cookies } from "next/headers";
import { columns } from "@/components/ui/users/columns"
import { DataTable } from "@/components/ui/users/data-table"
import { User } from "@/types/user"

async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const token = jwtCookie?.value;
    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json(); // Await the response.json() call
    return data;
}

export default async function UserPage() {
    const data = await getData()

    return (
        <div className="space-y-0">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">
                    Here's an overview of your business
                </p>
            </div>
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
