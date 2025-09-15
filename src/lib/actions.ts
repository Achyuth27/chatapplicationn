'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { users } from './data';

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
  const user = users.find((u) => u.email === email);
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

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
        return {
            errors: {
                email: ['An account with this email already exists.'],
            },
        };
    }

    // "Create" user - in a real app, you'd save to DB and get an ID
    const newUserId = (users.length + 1).toString();
    const newUser = {
        id: newUserId,
        name: username,
        email,
        avatar: `https://picsum.photos/seed/${newUserId}/100/100`,
        online: true,
    };
    users.push(newUser);


    // Set a session cookie
    cookies().set('auth-token', newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    });

    redirect('/');
}

export async function logout() {
  cookies().delete('auth-token');
  redirect('/login');
}
