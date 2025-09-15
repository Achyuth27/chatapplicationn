'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ContactList } from './contact-list';
import { ChatWindow } from './chat-window';
import { UserNav } from '../user-nav';
import type { User, Message } from '@/lib/types';
import { users as allUsers, messages as initialMessages } from '@/lib/data';
import { AddContact } from './add-contact';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean | undefined;
  navCollapsedSize: number;
  user: User;
}

// In a real app, this would be a proper state management solution.
// For this demo, we'll use a simple in-memory store.
let messagesStore = [...initialMessages];
const listeners = new Set<() => void>();

function useMessages() {
  const [messages, setMessages] = React.useState(messagesStore);

  React.useEffect(() => {
    const listener = () => setMessages(messagesStore);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return messages;
}

function addMessage(message: Message) {
  messagesStore = [...messagesStore, message];
  listeners.forEach(l => l());
}

export function ChatLayout({ user }: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const messages = useMessages();
  const [contacts, setContacts] = React.useState<User[]>(allUsers.filter((u) => u.id !== user.id));

  const handleSendMessage = (content: string) => {
    if (!selectedUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      receiverId: selectedUser.id,
      content,
      timestamp: new Date(),
    };
    addMessage(newMessage);
  };

  const handleAddContact = (newUser: User) => {
    if (!contacts.some(c => c.id === newUser.id)) {
        setContacts(prev => [...prev, newUser]);
    }
    setSelectedUser(newUser);
  };
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="h-14 flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <UserNav user={user} />
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">{user.name}</span>
            </div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
            <div className="p-2 group-data-[collapsible=icon]:hidden">
                <AddContact allUsers={allUsers} onAddContact={handleAddContact} currentUser={user} />
            </div>
            <ContactList 
                contacts={contacts}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
            />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <ChatWindow
            selectedUser={selectedUser}
            messages={messages.filter(m => (m.senderId === user.id && m.receiverId === selectedUser?.id) || (m.senderId === selectedUser?.id && m.receiverId === user.id))}
            currentUser={user}
            onSendMessage={handleSendMessage}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
