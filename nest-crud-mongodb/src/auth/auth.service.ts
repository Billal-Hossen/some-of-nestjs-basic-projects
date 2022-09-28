import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { ExistingUserDTO } from 'src/user/dtos/existing-user-dto';
import { UserRole } from 'src/user/dtos/new.user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async genHashpass(password: string): Promise<string> {
    return bcrypt.hash(password, 14);
  }

  async resister(user: CreateUserDto) {
    const { name, email, password } = user;
    const exestingUser = await this.userService.findByEmail(email);
    if (exestingUser) {
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await this.genHashpass(password);
    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );
    const tokens = await this.getTokens(newUser._id, newUser.name);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
    // return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('This email is not found');
    console.log(password);
    const matchPassword = await this.doesPasswordMatch(password, user.password);
    console.log(matchPassword);
    if (!matchPassword) throw new NotFoundException('This password Not match');
    return this.userService._getUserDetails(user);
  }

  async login(existingUserDto: ExistingUserDTO) {
    const { email, password } = existingUserDto;
    const user = await this.validateUser(email, password);
    if (!user)
      throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.genHashpass(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          name,
        },
        {
          secret: 'JWT_ACCESS_SECRET',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          name,
        },
        {
          secret: 'JWT_ACCESS_SECRET',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.userService.findById(userId);
  //   if (!user || !user.refreshToken)
  //     throw new ForbiddenException('Access Denied');
  //   const refreshTokenMatches = await bcrypt.verify(
  //     user.refreshToken,
  //     refreshToken,
  //   );
  //   if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  //   const tokens = await this.getTokens(user.id, user.username);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }
  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
  // update user
  async updateUserRole(id: string, role: UserRole) {
    const user = await this.userService.findById(id);
    if (user.role === 'customer') {
      console.log(id);
    }
  }
}
