import { User } from "./user"

export interface ImageData {
    url: string;
    id: string;
    user: User;
    timestamp: Date
    filetype: string
}