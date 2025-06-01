export type MessageType = 'user' | 'ai';

export interface Message {
  content: string;
  type: MessageType;
  timestamp: string;
}