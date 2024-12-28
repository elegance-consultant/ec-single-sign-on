// app/api/delete-cookie/route.ts
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const response = NextResponse.json({ message: 'Cookie deleted' });

  // Set the cookie to expire in the past to delete it
  response.cookies.set('token', '', {
    maxAge: -1, // Set maxAge to -1 to delete the cookie
    path: '/', // Set the path to match the cookie's path
  });

  return response;
}