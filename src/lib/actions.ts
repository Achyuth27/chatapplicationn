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

  const { email, password } = validatedFields.data;

  // In a real app, you would verify against a database
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
  
  // Set a session cookie
  cookies().set('auth-token', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });

  // Ensure all-users cookie is present for the next step
  if (!allUsersCookie) {
    cookies().set('all-users', JSON.stringify(allUsers), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
  }

  redirect('/');
}

export async function signup(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { username, email, password } = validatedFields.data;
    
    // Check in cookie-stored users as well
    const allUsersCookie = cookies().get('all-users')?.value;
    const allUsers: User[] = allUsersCookie ? JSON.parse(allUsersCookie) : [...initialUsers];
    
    if (allUsers.some((u: any) => u.email === email)) {
        return {
            errors: {
                email: ['An account with this email already exists.'],
            },
        };
    }

    // "Create" user - in a real app, you'd save to DB and get an ID
    const newUserId = `user-${Date.now()}`;
    const newUser: User = {
        id: newUserId,
        name: username,
        email,
        avatar: `https://picsum.photos/seed/${newUserId}/100/100`,
        online: true,
    };
    
    allUsers.push(newUser);

    // Set a session cookie
    cookies().set('auth-token', newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    });
    
    // Store the updated user list in a cookie
    cookies().set('all-users', JSON.stringify(allUsers), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });


    redirect('/');
}

export async function logout() {
  cookies().delete('auth-token');
  cookies().delete('all-users');
  redirect('/login');
}
