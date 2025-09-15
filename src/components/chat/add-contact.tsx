'use client';

import * as React from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import type { User } from '@/lib/types';
import { UserAvatar } from '../user-avatar';

interface AddContactProps {
  allUsers: User[];
  onAddContact: (user: User) => void;
  currentUser: User;
}

export function AddContact({ allUsers, onAddContact, currentUser }: AddContactProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const handleSelect = (user: User) => {
    onAddContact(user);
    setSearch('');
    setOpen(false);
  };

  const filteredUsers = allUsers.filter(u => u.id !== currentUser.id && u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Command shouldFilter={false} className="relative">
      <CommandInput 
        placeholder="Search or add contact..." 
        value={search}
        onValueChange={setSearch}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <CommandList className="absolute top-10 z-10 w-full rounded-md border bg-card text-card-foreground shadow-lg">
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filteredUsers.map(user => (
              <CommandItem key={user.id} onSelect={() => handleSelect(user)} value={user.name}>
                <div className="flex items-center gap-2">
                    <UserAvatar user={user} className="w-6 h-6" />
                    <span>{user.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
