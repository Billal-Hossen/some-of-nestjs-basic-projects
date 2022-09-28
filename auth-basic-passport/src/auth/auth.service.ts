import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    if (user && user.password === pass) {
      const { userName, password, ...result } = user;
      return result;
    }
    return null;
  }
}
