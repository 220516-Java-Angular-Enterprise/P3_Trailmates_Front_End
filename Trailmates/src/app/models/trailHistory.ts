import { Trail } from './trail';
import { User } from "./user";

export interface TrailHistory{
  id?: string;
  trail_id?: Trail;
  user_id?: User;
  comment?: string;
  date?: Date;
}