import { NextResponse, NextRequest } from 'next/server';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('session');
    const jwtCookie_str = jwtCookie?.value;

    const { pathname } = request.nextUrl;

    const protectedPaths = ['/dashboard', '/users'];
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        if (jwtCookie_str) {
            try {
                const decodedToken: JwtPayload = jwtDecode(jwtCookie_str);
                
                if (decodedToken.aud === 'account') {
                    return NextResponse.redirect(new URL('access-denied', request.url));
                }
            } catch (error) {
                console.error('Failed to decode JWT:', error);
            }
        } else {
            return NextResponse.redirect(new URL('login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/users/:path*'],
};
