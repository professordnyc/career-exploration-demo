export type UserRole = 'student' | 'counselor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile extends User {
  role: UserRole;
  full_name: string;
  avatar_url?: string;
}
