import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: UserDto) {
    return this.userRepository.save(user);
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  findOneUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, user: UserDto) {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
