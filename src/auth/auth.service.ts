import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import comparePasswords from '../shared/utils/comparePasswords';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneUser({ username });
    if (user == null) return null;
    const isPasswordCorrect = await comparePasswords(password, user.password);
    return isPasswordCorrect ? user : null;
  }

  async signIn(user: User): Promise<{ access_token: string }> {
    const payload: JwtPayload = { name: user.name, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
