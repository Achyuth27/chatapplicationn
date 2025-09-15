'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { users as initialUsers } from './data';
import type { User } from './types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  const allUsersCookie = cookies().get('all-users')?.value;
  const allUsers: User[] = allUsersCookie ? JSON.parse(allUsersCookie) : initialUsers;
  
  const user = allUsers.find((u) => u.email === email);
  
  if (!user) {
    return {
      errors: {
        email: ['Invalid credentials'],
        password: ['Invalid credentials'],
      },
    };
  }
  
  cookies().set('auth-token', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });

  cookies().set('all-users', JSON.stringify(allUsers), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
  });

  redirect('/');
}

export async function signup(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { username, email } = validatedFields.data;
    
    const allUsersCookie = cookies().get('all-users')?.value;
    const allUsers: User[] = allUsersCookie ? JSON.parse(allUsersCookie) : initialUsers;
    
    if (allUsers.some((u) => u.email === email)) {
        return {
            errors: {
                email: ['An account with this email already exists.'],
            },
        };
    }

    const newUserId = `user-${Date.now()}`;
    const newUser: User = {
        id: newUserId,
        name: username,
        email,
        avatar: `https://picsum.photos/seed/${newUserId}/100/100`,
        online: true,
    };
    
    const updatedUsers = [...allUsers, newUser];

    cookies().set('auth-token', newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
    
    cookies().set('all-users', JSON.stringify(updatedUsers), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    redirect('/');
}
