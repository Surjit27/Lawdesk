import { ChatUser } from '../types/chat';

export const SAMPLE_USERS: ChatUser[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Partner',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100',
    specialization: 'Corporate Law',
    online: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Managing Partner',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=100&h=100',
    specialization: 'Civil Litigation',
    online: true,
    lastSeen: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Arun Patel',
    role: 'Senior Associate',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100',
    specialization: 'Criminal Law',
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
];

export const SAMPLE_CHATS = SAMPLE_USERS.map(user => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
  role: user.role,
  online: user.online,
  lastMessage: '',
  lastMessageTime: '',
  lastMessageSent: false,
  lastMessageRead: false,
  messages: [],
}));