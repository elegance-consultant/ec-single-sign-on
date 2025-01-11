import { NextResponse, NextRequest } from 'next/server';
import { decode } from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

export async function middleware(request: NextRequest) {

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const jwtCookie_str = jwtCookie?.value;

    const { pathname } = request.nextUrl;

    const protectedPaths = ['/dashboard', '/users'];
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        const token = request.cookies.get('token');
        
        if (jwtCookie_str) {
            try {
                const decodedToken: any = decode(jwtCookie_str);
                if (decodedToken.aud === 'account') {
                    const headersList = headers();
                    const users = (await headersList).get('next-url');
                    if (users == '/dashboard' || users == '/access-denied') {
                        return NextResponse.redirect(new URL('/access-denied', request.url));
                    }
                }
            } catch (error) {
                console.error('Failed to decode JWT:', error);
            }
        }
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/users/:path*'],
};