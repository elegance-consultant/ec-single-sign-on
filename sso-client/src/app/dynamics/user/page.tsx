import { User } from "@/types/user";
import { cookies } from "next/headers";

interface UserProp {
    user: User;
}

export default async function Page({user}: UserProp) {
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
    // console.log(Object.keys(data[0]));
}