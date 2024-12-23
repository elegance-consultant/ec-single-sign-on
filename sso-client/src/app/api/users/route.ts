import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, {}) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.ok) {
        const users = await response.json();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } else {
        return new NextResponse('Failed to fetch users', { status: 500 });
    }
}