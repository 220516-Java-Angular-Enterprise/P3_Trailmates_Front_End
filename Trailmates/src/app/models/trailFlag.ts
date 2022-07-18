import { Trail } from './trail';
import { User } from "./user";

export interface TrailFlag{
  id?: string;
  trailId?: Trail;
  userId?: User;
  dateInt?: number | any;
}