import { Trail } from './trail';
import { User } from './user';
export interface UserReview{
  id?: string;
  message?: string;
  rating?: string;
  trail_id?: Trail;
  user_id?: User
}