import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { jwtCookie } = body;
    if (!jwtCookie) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(`${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALMS}/protocol/openid-connect/userinfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtCookie}`
        },
    });

    if (response.ok) {
        const userInfo = await response.json();
        return new NextResponse(JSON.stringify(userInfo), { status: 200 });
    } else {
        return new NextResponse('Failed to fetch user info', { status: 500 });
    }
}
