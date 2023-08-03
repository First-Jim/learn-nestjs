import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signin(username: string, password: string) {
    const res = await this.userService.find(username);
    return res;
  }
  async signup(username: string, password: string) {
    if (!username || !password) {
      throw new HttpException('用户名或密码不能为空', 400);
    }
    return await this.userService.create({
      username,
      password,
    });
  }
}
