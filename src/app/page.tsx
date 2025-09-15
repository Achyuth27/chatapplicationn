import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users } from '@/lib/data';

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token')?.value;
  const loggedInUser = users.find(user => user.id === authToken);

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
