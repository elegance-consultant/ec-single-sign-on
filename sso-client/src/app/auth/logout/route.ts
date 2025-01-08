// app/api/delete-cookie/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const deleteCookie = (await cookies()).delete('token');
  return NextResponse.json({
    message: deleteCookie
  })
}