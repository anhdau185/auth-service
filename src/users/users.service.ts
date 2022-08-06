import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import hashData from '../shared/utils/hashData';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(rawUserData: UserDto): Promise<User> {
    const hashedPassword = await hashData(rawUserData.password);
    const processedUserData: UserDto = {
      ...rawUserData,
      password: hashedPassword,
    };

    return this.usersRepository.save(processedUserData);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneUser(where: FindOptionsWhere<User>): Promise<User | null> {
    const user = await this.usersRepository.findOneBy(where);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async updateUser(id: number, userData: UserDto): Promise<User> {
    const user = await this.findOneUser({ id });
    const updatedUserData = {
      ...user,
      ...userData,
    };

    return this.usersRepository.save(updatedUserData);
  }

  async deleteUser(id: number): Promise<void> {
    this.usersRepository.delete(id);
  }
}
