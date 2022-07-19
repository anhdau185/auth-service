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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  list() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.findOneUser(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserDto) {
    return this.usersService.updateUser(parseInt(id), user);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.usersService.deleteUser(parseInt(id));
  }
}
