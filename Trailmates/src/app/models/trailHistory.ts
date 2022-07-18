import { Trail } from './trail';
import { User } from "./user";

export interface TrailHistory{
  id?: string,
  trail_id?: Trail,
  user_id?: User,
  comment?: string,
  date?: Date
  trailName?: string,
  partnername?: string,
  trail_date?: Date,
  imageURL?: string
}