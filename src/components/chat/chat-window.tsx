'use client';

import React from 'react';
import { UserAvatar } from '../user-avatar';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';
import type { User, Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareDashed } from 'lucide-react';

interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  allUsers: User[];
}

export function ChatWindow({ selectedUser, messages, currentUser, onSendMessage, allUsers }: ChatWindowProps) {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const viewportRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const viewport = viewportRef.current;
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages, selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-secondary/40">
        <MessageSquareDashed className="h-16 w-16 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-xl font-medium text-foreground">No conversation selected</h2>
          <p className="text-muted-foreground">Select a contact to start chatting or add a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center gap-3 border-b bg-card px-4">
        <UserAvatar user={selectedUser} />
        <div>
          <h2 className="font-semibold">{selectedUser.name}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedUser.online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1" viewportRef={viewportRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} currentUser={currentUser} allUsers={allUsers} />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
