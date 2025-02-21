import { cookies } from "next/headers";
import { UserForm } from "@/components/ui/users/view";
import { User } from "@/types/user";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('session');
    const jwtCookie_str = jwtCookie?.value;
    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtCookie_str}`
        },
    });
    const data = await response.json();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">User Information</h2>
                <p className="text-muted-foreground">
                    Here's an overview of your business
                </p>
            </div>
            <UserForm user={data} />
        </div>
    );
}