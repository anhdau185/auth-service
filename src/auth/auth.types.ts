import { Request } from 'express';
import { User } from '../users/user.entity';

export type AuthenticatedRequest = Omit<Request, 'user'> & { user: User };

export interface UserCredentials {
  username: string;
  password: string;
}

export interface JwtPayload {
  name: string;
  sub: number;
}
