import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.findOneBy(where);
  }

  async updateUser(id: number, user: UserDto): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<void> {
    this.usersRepository.delete(id);
  }
}
