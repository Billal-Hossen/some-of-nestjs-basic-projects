import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { getCurrentUserById } from './auth/decorator/get.user.by.id.decorator';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@getCurrentUserById() userId: number): string {
    console.log(userId);
    return this.appService.getHello();
  }
}
