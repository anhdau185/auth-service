import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { concealCredentials } from './users.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() user: UserDto) {
    const createdUser = await this.usersService.createUser(user);
    return concealCredentials(createdUser);
  }

  @Get()
  async list() {
    const users = await this.usersService.findAllUsers();
    return users.map(concealCredentials);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.usersService.findOneUser({ id: parseInt(id) });
    return concealCredentials(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UserDto) {
    const updatedUser = await this.usersService.updateUser(parseInt(id), user);
    return concealCredentials(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.usersService.deleteUser(parseInt(id));
  }
}
