import { Conversation } from './conversations';
import { User } from 'src/app/models/user';
export interface PrivateMessage{
  id?: string;
  message?: string;
  time_sent?: Date;
  sender_id?: User;
  conversation?: Conversation
}