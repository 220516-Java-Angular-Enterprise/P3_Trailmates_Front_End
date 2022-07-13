import { User } from 'src/app/models/user';
import { Conversation } from './conversation';
export interface OwnedCoversation{
  id?: string;
  owner?: User;
  conversation?: Conversation;
}