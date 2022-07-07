import { Trail } from './trail';
import { User } from "./user";

export interface TrailComment{
  id?: string;
  message?: string;
  user_id?: User;
  trail_id?: Trail;
}