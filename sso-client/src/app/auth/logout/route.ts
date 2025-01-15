import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('session');
    const token = cookieStore.get('session')?.value;
    const jwtCookie_str = jwtCookie?.value;

    if (jwtCookie_str) {
        try {
            const decodedToken: any = jwtDecode(jwtCookie_str);
            if (decodedToken.aud?.[0] === 'realm-management') {
                const logout = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users/${decodedToken.sub}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
