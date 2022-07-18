import { Trail } from './trail';
import { User } from "./user";

export interface TrailFlag{
  id?: string;
  trailId?: string;
  userId?: User;
  dateInt?: number | any;
}