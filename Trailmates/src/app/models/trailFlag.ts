import { Trail } from './trail';
import { User } from "./user";

export interface TrailFlag{
  id?: string;
<<<<<<< HEAD
  trailId?: string;
  userId?: User;
  dateInt: number;
=======
  trailId?: Trail;
  userId?: User;
  dateInt?: number;
>>>>>>> 9374765adc5813304cc1cac306d654a4f4a24b8e
}