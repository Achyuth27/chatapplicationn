import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users } from '@/lib/data';

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  
  const authToken = cookies().get('auth-token')?.value;

  // The middleware already handles the case where there is no token.
  // This check is for when the token exists but the user doesn't.
  const loggedInUser = users.find(user => user.id === authToken);

  if (!loggedInUser) {
    // This case might happen if the user was deleted but the cookie remains.
    // We can't delete the cookie here, so we redirect to logout which can.
    redirect('/login');
  }

  return (
    <main className="h-screen w-full">
      <ChatLayout
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={8}
        user={loggedInUser}
      />
    </main>
  );
}
