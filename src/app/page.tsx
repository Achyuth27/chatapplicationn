import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users, Message } from '@/lib/data';

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  
  // For demonstration, we'll assume user with ID '1' is logged in.
  // In a real app, you'd get this from the session.
  const loggedInUser = users.find(user => user.id === '1');

  if (!loggedInUser) {
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
