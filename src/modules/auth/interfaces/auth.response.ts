import type { User } from './user.interface';

export type AuthResponse = {
  user: User;
  token: string;
};
