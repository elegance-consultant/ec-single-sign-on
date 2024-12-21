import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define the paths that need protection
    const protectedPaths = ['/dashboard', '/profile']; // Add any other protected paths here

    // Check if the request path is protected
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        const token = request.cookies.get('token'); // Check for auth token in cookies       

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
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Apply middleware only to specified routes
};