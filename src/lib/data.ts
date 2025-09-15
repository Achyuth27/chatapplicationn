import { User, Message } from './types';

export const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', avatar: 'https://picsum.photos/seed/1/100/100', online: true },
  { id: '2', name: 'Bob', email: 'bob@example.com', avatar: 'https://picsum.photos/seed/2/100/100', online: false },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', avatar: 'https://picsum.photos/seed/3/100/100', online: true },
  { id: '4', name: 'Diana', email: 'diana@example.com', avatar: 'https://picsum.photos/seed/4/100/100', online: false },
  { id: '5', name: 'Eve', email: 'eve@example.com', avatar: 'https://picsum.photos/seed/5/100/100', online: true },
  { id: '6', name: 'Frank', email: 'frank@example.com', avatar: 'https://picsum.photos/seed/6/100/100', online: true },
  { id: '7', name: 'Grace', email: 'grace@example.com', avatar: 'https://picsum.photos/seed/7/100/100', online: false },
  { id: '8', name: 'Jake', email: 'jakey@gmail.com', avatar: 'https://picsum.photos/seed/8/100/100', online: true },
];

export const messages: Message[] = [
  { id: 'msg1', senderId: '1', receiverId: '2', content: 'Hey Bob, how are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 'msg2', senderId: '2', receiverId: '1', content: 'Hi Alice! I am good, thanks for asking. How about you?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5) },
  { id: 'msg3', senderId: '1', receiverId: '2', content: 'I am doing great! Working on a new project.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) },
  { id: 'msg4', senderId: '2', receiverId: '1', content: 'That sounds exciting!', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 'msg5', senderId: '3', receiverId: '1', content: 'Hey Alice, do you have the files I sent?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
  { id: 'msg6', senderId: '1', receiverId: '3', content: 'Yes, Charlie, I got them. Thanks!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5) },
  { id: 'msg7', senderId: '4', receiverId: '1', content: 'Lunch tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
];
