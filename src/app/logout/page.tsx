'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  cookies().delete('auth-token');
  
  useEffect(() => {
    // Redirect on the client-side to ensure a full page refresh
    // and to avoid any caching issues with the middleware.
    window.location.href = '/login';
  }, []);

  // For server-side redirection as a fallback.
  redirect('/login');
  
  return null;
}
