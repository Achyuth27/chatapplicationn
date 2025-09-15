'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ContactList } from './contact-list';
import { ChatWindow } from './chat-window';
import { UserNav } from '../user-nav';
import type { User, Message } from '@/lib/types';
import { users as allUsers, messages as allMessages } from '@/lib/data';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean | undefined;
  navCollapsedSize: number;
  user: User;
}

export function ChatLayout({ user }: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [messages, setMessages] = React.useState<Message[]>(allMessages);

  const contacts = allUsers.filter((u) => u.id !== user.id);

  const handleSendMessage = (content: string) => {
    if (!selectedUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      receiverId: selectedUser.id,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate a reply
    setTimeout(() => {
        const replyMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            senderId: selectedUser.id,
            receiverId: user.id,
            content: "That's interesting! Tell me more.",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, replyMessage]);
    }, 2000);
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
