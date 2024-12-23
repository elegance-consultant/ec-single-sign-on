import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;
    const res = await fetch(`${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALMS}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username,
            password: password,
            grant_type: 'password',
            client_id: `${process.env.KEYCLOAK_ID}`,
            client_secret: `${process.env.KEYCLOAK_SECRET}`,
            scope: 'openid profile email'
        }),
    });

    if (res.ok) {
        const data = await res.json();
        const { access_token, expires_in} = data;

        // Set the token in a cookie
        const cookie = serialize('token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in, // expire token
            path: '/'
        });
        const response = NextResponse.json({ message: 'Logged in successfully' });
        response.headers.append('Set-Cookie', cookie);
        return response;
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
