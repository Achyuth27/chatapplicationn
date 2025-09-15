'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LogoutPage() {
  cookies().delete('auth-token');
  redirect('/login');
}
