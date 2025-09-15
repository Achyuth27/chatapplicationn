'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('all-users');

  const response = NextResponse.redirect(new URL('/login', request.url), {
    status: 307, // Use 307 for temporary redirect
  });

  // Ensure cookies are cleared on the client
  response.cookies.delete('auth-token');
  response.cookies.delete('all-users');

  return response;
}
