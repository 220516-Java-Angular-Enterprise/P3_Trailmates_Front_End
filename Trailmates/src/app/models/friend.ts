import { User } from "./user";
export interface Friend{
    id?: string;
    user_id?: User;
    friend_id?: User;
  }
