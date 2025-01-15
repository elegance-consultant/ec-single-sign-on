import { NextRequest, NextResponse } from "next/server";

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
            grant_type: `${process.env.KEYCLOAK_GRANT_TYPE}`,
            client_id: `${process.env.KEYCLOAK_ID}`,
            client_secret: `${process.env.KEYCLOAK_SECRET}`,
            scope: `${process.env.KEYCLOAK_SCOPE}`
        }),
    });

    if (res.ok) {
        const data = await res.json();
        const { access_token, expires_in } = data;

        const response = NextResponse.json({
            message: 'Login successful',
            access_token,
        });
        response.cookies.set('session', access_token, {
            httpOnly: true,
            secure: true,
            maxAge: expires_in
        });
        return response;
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
