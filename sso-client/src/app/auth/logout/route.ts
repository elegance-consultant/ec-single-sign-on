import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
 
export async function GET() {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token')?.value;
    const logout = await fetch(`${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALMS}/protocol/openid-connect/logout`, {
        method: 'POST',
        body: new URLSearchParams({
            client_id: `${process.env.KEYCLOAK_ID}`,
            client_secret: `${process.env.KEYCLOAK_SECRET}`,
            refresh_token:`${refresh_token}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    cookieStore.delete('token');
    cookieStore.delete('refresh_token');
    return NextResponse.json(logout)
}