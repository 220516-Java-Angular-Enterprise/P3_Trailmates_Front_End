import { Trail } from './trail';
import { User } from "./user";

export interface TrailFlag{
  id?: string;
  trail_id?: Trail;
  user_id?: User;
  date_int: number;
}