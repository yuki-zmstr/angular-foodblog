export interface UserProfile {
  // id?: number;
  password: string;
  email: string;
  // comments?: Comment[];
  // able to delete own comments.
  is_admin: boolean;
}
