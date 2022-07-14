import { User } from 'src/app/models/user';
export interface Friend{
  user_id?: User;
  friend_id?: User;
}