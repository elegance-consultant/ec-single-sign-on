import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const createusers = fetch(`${process.env.KEYCLOAK_HOST}/admin/realms/${process.env.KEYCLOAK_REALMS}`, {
    //     method: 'POST',
    //     headers: {

    //     },
    //     body: JSON.stringify({  })
    // })
    return new NextResponse();
}