import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users as initialUsers } from '@/lib/data';
import type { User } from '@/lib/types';

export default async function Home() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token')?.value;

  // The middleware ensures an auth-token exists, so we don't need to check here.
  // This page now handles what happens if that token is invalid.
  
  const allUsersCookie = cookieStore.get('all-users')?.value;
  const allUsers: User[] = allUsersCookie ? JSON.parse(allUsersCookie) : initialUsers;
  
  const loggedInUser = allUsers.find(user => user.id === authToken);

  if (!loggedInUser) {
    // If the token is invalid or the user was deleted,
    // clear the cookie by redirecting to the logout route.
    redirect('/logout');
  }

  return (
    <main className="h-screen w-full">
      <ChatLayout
        user={loggedInUser}
        allUsers={allUsers}
      />
    </main>
  );
}
