import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { Friend } from './friend';
import { TrailHistory } from 'src/app/models/trailHistory';

import { Trail } from './trail';
import { User } from "./user";

export interface Notification{
  id?: string;
  message?: string;
  user_id?: User;
  timeCreated?: any;
  notification_type?: string;
  trail_id?: Trail;
  trail_history_id?: TrailHistory;
  friend?: Friend;
  convo?: OwnedCoversation
}