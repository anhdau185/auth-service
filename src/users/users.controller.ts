import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { concealCredentials } from './users.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userData: UserDto) {
    const createdUser = await this.usersService.createUser(userData);
    return concealCredentials(createdUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    const users = await this.usersService.findAllUsers();
    return users.map(concealCredentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.usersService.findOneUser({ id: parseInt(id) });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return concealCredentials(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UserDto) {
    const updatedUser = await this.usersService.updateUser(parseInt(id), user);
    return concealCredentials(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.usersService.deleteUser(parseInt(id));
  }
}
