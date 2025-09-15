'use client';

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { UserAvatar } from "../user-avatar";
import type { User } from "@/lib/types";

interface ContactListProps {
    contacts: User[];
    selectedUser: User | null;
    onSelectUser: (user: User) => void;
}

export function ContactList({ contacts, selectedUser, onSelectUser }: ContactListProps) {
    return (
        <div className="p-2">
            <h2 className="text-lg font-semibold tracking-tight px-2 mb-2 group-data-[collapsible=icon]:hidden">
                Chats
            </h2>
             <div className="group-data-[collapsible=icon]:hidden h-px w-full bg-border mx-auto mb-2" />
            <SidebarMenu>
                {contacts.map((contact) => (
                    <SidebarMenuItem key={contact.id}>
                        <SidebarMenuButton
                            onClick={() => onSelectUser(contact)}
                            isActive={selectedUser?.id === contact.id}
                            tooltip={{
                                children: contact.name,
                                className: 'bg-sidebar-accent text-sidebar-accent-foreground',
                            }}
                            className="justify-start"
                        >
                            <UserAvatar user={contact} className="w-8 h-8"/>
                            <span className="truncate">{contact.name}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </div>
    );
}
