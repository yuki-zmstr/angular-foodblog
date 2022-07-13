import { Comment } from "./comment";

export interface UserProfile {
  // id?: number;
  email?: string;
  password?: string;
  // comments?: Comment[];
  // able to delete own comments.
  is_admin?: boolean;
}