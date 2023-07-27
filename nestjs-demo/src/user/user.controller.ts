import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
import { User } from './user.entiry';
@Controller('user')
export class UserController {
  constructor(
    private useService: UserService,
    private configService: ConfigService,
  ) {
    // this.useService = new UserService();
  }
  @Get()
  getUsers(): any {
    return this.useService.findAll();
  }

  @Post('')
  addUser() {
    const user = {
      username: 'admin',
      password: 'admin',
    } as User;
    return this.useService.create(user);
  }

  @Get('/range/:id')
  getRange(@Param('id') id): any {
    let arr = [];

    for (let i = 0; i < id; i++) {
      arr.push(i + '');
    }

    return arr;
  }

  @Get('/profile/:id')
  getProfile(@Param('id') id: number): any {
    return this.useService.findProfile(id);
  }

  @Get('logs/:id')
  getUserLogs(@Param('id') id: number): any {
    return this.useService.findUserLogs(id);
  }
}
