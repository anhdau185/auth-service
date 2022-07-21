import { Request } from 'express';
import { User } from '../users/user.entity';

export type AuthenticatedRequest = Omit<Request, 'user'> & { user: User };
