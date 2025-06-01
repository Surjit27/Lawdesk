import { Chat } from '../types/chat';

export const SAMPLE_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'Senior Attorney',
    online: true,
    lastMessage: 'I will review your case details shortly',
    lastMessageTime: '10:30 AM',
    lastMessageSent: true,
    lastMessageRead: true,
    messages: [
      {
        id: '1',
        content: 'Hello! How can I assist you with your legal matter today?',
        senderId: '1',
        timestamp: '10:28 AM'
      },
      {
        id: '2',
        content: 'I need help with a property dispute case',
        senderId: 'currentUser',
        timestamp: '10:29 AM'
      },
      {
        id: '3',
        content: 'I will review your case details shortly',
        senderId: '1',
        timestamp: '10:30 AM'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    role: 'Corporate Lawyer',
    online: true,
    lastMessage: 'The court hearing is scheduled for next week',
    lastMessageTime: '9:45 AM',
    lastMessageSent: false,
    lastMessageRead: false,
    messages: [
      {
        id: '1',
        content: 'The court hearing is scheduled for next week',
        senderId: '2',
        timestamp: '9:45 AM'
      }
    ]
  }
];