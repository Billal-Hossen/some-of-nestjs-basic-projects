import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
  signUp() {
    return this.authService.signUp();
  }
}
