'use client';

import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";
import { users } from "@/lib/data";
import type { User, Message } from "@/lib/types";

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isCurrentUser = message.senderId === currentUser.id;
  const sender = users.find(user => user.id === message.senderId);

  return (
    <div className={cn("flex items-end gap-2", isCurrentUser && "justify-end")}>
      {!isCurrentUser && sender && (
        <UserAvatar user={sender} className="w-8 h-8" />
      )}
      <div
        className={cn(
          "max-w-xs rounded-lg p-3 lg:max-w-md",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className={cn(
          "mt-1 text-xs",
          isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isCurrentUser && (
        <UserAvatar user={currentUser} className="w-8 h-8" />
      )}
    </div>
  );
}
