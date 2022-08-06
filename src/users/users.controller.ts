import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { concealCredentials } from './users.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async register(@Body() userData: UserDto) {
    const createdUser = await this.usersService.createUser(userData);
    return concealCredentials(createdUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getList() {
    const users = await this.usersService.findAllUsers();
    return users.map(concealCredentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const user = await this.usersService.findOneUser({ id: parseInt(id) });
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
