import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users as initialUsers } from '@/lib/data';
import type { User } from '@/lib/types';

export default async function Home() {
  const authToken = cookies().get('auth-token')?.value;

  // The middleware already handles the case where there is no token.
  // This check is for when the token exists but the user doesn't.
  
  const allUsersCookie = cookies().get('all-users')?.value;
  const allUsers: User[] = allUsersCookie ? JSON.parse(allUsersCookie) : initialUsers;
  
  const loggedInUser = allUsers.find(user => user.id === authToken);

  if (!loggedInUser) {
    // This case might happen if the user was deleted but the cookie remains.
    // We can't delete the cookie here, so we redirect to logout which can.
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
