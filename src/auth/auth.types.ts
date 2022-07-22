import { Request } from 'express';

export type AuthenticatedRequest<T> = Omit<Request, 'user'> & { user: T };

export interface UserCredentials {
  username: string;
  password: string;
}

export interface JwtPayload {
  name: string;
  sub: number;
}
