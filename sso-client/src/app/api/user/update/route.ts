import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const updateUser = await req.json();
    const { id } = updateUser;
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const token = jwtCookie?.value;
    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateUser)
    });
    const update = await response.json();
    return NextResponse.json({ update });
}