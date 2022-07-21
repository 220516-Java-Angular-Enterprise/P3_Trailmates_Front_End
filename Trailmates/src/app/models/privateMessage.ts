import { Conversation } from './conversation';
import { User } from './user';
export interface PrivateMessage{
  id?: string;
  message?: string;
  time_sent?: any;
  sender_id?: User;
  conversation?: Conversation
}