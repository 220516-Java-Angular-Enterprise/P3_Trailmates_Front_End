import { Trail } from './trail';
import { User } from "./user";

export interface Notification{
  id?: string;
  message?: string;
  user_id?: User;
  trail_id?: Trail;
}