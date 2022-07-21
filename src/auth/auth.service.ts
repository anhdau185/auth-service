import { Injectable } from '@nestjs/common';

import comparePasswords from '../shared/utils/comparePasswords';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOneUser({ username });
    const userNotExisting = user == null;

    if (userNotExisting) return false;

    const isPasswordCorrect = await comparePasswords(password, user.password);
    return isPasswordCorrect;
  }
}
