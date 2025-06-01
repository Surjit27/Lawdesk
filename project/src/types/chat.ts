export interface ChatUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialization: string;
  online: boolean;
  lastSeen: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageSent: boolean;
  lastMessageRead: boolean;
  messages: Message[];
}

export interface ChatState {
  users: ChatUser[];
  chats: Chat[];
  selectedChat: Chat | null;
  selectChat: (chatId: string) => void;
  sendMessage: (content: string) => void;
}