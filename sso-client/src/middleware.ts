import { NextResponse, NextRequest } from 'next/server';
import { decode } from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

export async function middleware(request: NextRequest) {

    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get('token');
    const jwtCookie_str = jwtCookie?.value;

    const { pathname } = request.nextUrl;


    // Define the paths that need protection
    const protectedPaths = ['/dashboard', '/users']; // Add any other protected paths here

    // Check if the request path is protected
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        const token = request.cookies.get('token'); // Check for auth token in cookies       
        
        if (jwtCookie_str) {
            try {
                const decodedToken: any = decode(jwtCookie_str);
                // console.log(decodedToken.aud);
                if (decodedToken.aud === 'account') {
                    const headersList = headers();
                    const users = (await headersList).get('next-url');
                    if (users === '/dashboard') {
                        return NextResponse.redirect(new URL('/access-denied', request.url));
                    }
                    
                }
            } catch (error) {
                console.error('Failed to decode JWT:', error);
            }
        }
        // If the token is not present, redirect to the login page (or index page)
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url)); // Redirect to the index page
        }
    }

    // If the user is authenticated, continue with the request
    return NextResponse.next();
}

// Optional: Configure the matcher to apply middleware only to specific routes
export const config = {
    matcher: ['/dashboard/:path*', '/users/:path*'], // Apply middleware only to specified routes
};