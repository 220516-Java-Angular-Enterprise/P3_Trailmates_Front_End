import { Trail } from "./trail";
import { User } from "./user";

export interface TrailReview {
    trailReviewID?: string;
    rating?: number;
    comment?: string;
    userID?: User;
} 