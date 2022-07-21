import { User } from './user.entity';
import { PublicUserData } from './users.types';

export function concealCredentials(user: User): PublicUserData {
  return {
    id: user.id,
    name: user.name,
    scope: user.scope,
  };
}
