import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
 
export async function GET() {
    const cookieStore = await cookies();
    const id_token = cookieStore.get('id_token')?.value;
    const logout = await fetch(`${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALMS}/protocol/openid-connect/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: `${process.env.KEYCLOAK_ID}`,
            client_secret: `${process.env.KEYCLOAK_SECRET}`,
            id_token: `${id_token}`
        }),
    });
    cookieStore.delete('session');
    cookieStore.delete('refresh_token');
    cookieStore.delete('id_token');
    return NextResponse.json({ logout });
}
