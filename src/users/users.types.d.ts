import type { User } from './user.entity';

export declare type PublicUserData = Omit<User, 'username' | 'password'>;
