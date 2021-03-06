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

export interface JWTs {
  access_token: string;
  refresh_token: string;
}

export interface RevokeOptions {
  usingUserId?: number;
  usingToken?: string;
}
