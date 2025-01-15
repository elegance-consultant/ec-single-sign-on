import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('session');
    const jwtCookie_str = jwtCookie?.value;

    let uuid = '';
    if (jwtCookie_str) {
        try {
            const decodedToken: any = jwtDecode(jwtCookie_str);
            uuid = decodedToken.sub;
            if (decodedToken.aud?.[0] === 'realm-management') {
                const logout = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/${uuid}/logout`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                cookieStore.delete('session');
                return NextResponse.json({ message: logout });
            }
            cookieStore.delete('session');
            return NextResponse.json({ message: 'logout' });
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
}
