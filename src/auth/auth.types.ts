import { Request } from 'express';

export type AuthenticatedRequest<T> = Omit<Request, 'user'> & { user: T };

export interface UserCredentials {
  username: string;
  password: string;
}

export interface JwtPayload {
  name: string;
  sub: number;
  iat?: number;
  exp?: number;
}

export interface ExtendedJwtPayload extends JwtPayload {
  exp_refresh?: number;
}

export interface JwtTokens {
  access_token: string;
  refresh_token: string;
}
