import { cookies } from "next/headers";
import { UserForm } from "@/components/ui/users/view";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const jwtCookie_str = jwtCookie?.value;
    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtCookie_str}`
        },
    });
    const data = await response.json(); // Await the response.json() call
    // console.log(data);
    
    return (
        <UserForm user={data} />
    );
}