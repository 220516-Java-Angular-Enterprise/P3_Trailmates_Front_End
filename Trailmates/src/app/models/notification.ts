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
  trailHistory?: TrailHistory;
  friend?: Friend;
}