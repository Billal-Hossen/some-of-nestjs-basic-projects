import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/users';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  signIn(dto: AuthDto) {
    const userInfo = user.find((user) => user.email === dto.email);
    if (!userInfo) throw new UnauthorizedException('Credentials incorrect');
    if (userInfo.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect');

    return this.SignInUser(userInfo.id, userInfo.email, 'user');
  }
  SignInUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      userId,
      email,
      type,
    });
  }
  signUp() {
    return 'This is signUp method';
  }
}
