import type { Request } from 'express';

export declare type AuthenticatedRequest<T> = Omit<Request, 'user'> & {
  user: T;
};

export declare interface UserCredentials {
  username: string;
  password: string;
}

export declare interface JwtPayload {
  name: string;
  sub: number;
  iat?: number;
  exp?: number;
}

export declare interface ExtendedJwtPayload extends JwtPayload {
  exp_refresh?: number;
}

export declare interface JWTs {
  access_token: string;
  refresh_token: string;
}

export declare interface RevokeOptions {
  usingUserId?: number;
  usingToken?: string;
}
