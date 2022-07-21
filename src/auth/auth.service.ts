import { Injectable } from '@nestjs/common';

import comparePasswords from '../shared/utils/comparePasswords';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneUser({ username });
    if (user == null) return null;

    const isPasswordCorrect = await comparePasswords(password, user.password);
    return isPasswordCorrect ? user : null;
  }
}
