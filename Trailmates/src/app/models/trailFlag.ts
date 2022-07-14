import { Trail } from './trail';
import { User } from "./user";

export interface TrailFlag{
  id?: string;
  trail_id?: string;
  userId?: User;
  date_int: number;
}