import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FreezsePipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // Single API base guard(Indivudial Route base)
  // @UseGuards(AuthGuard)
  // @UseInterceptors(LogginInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postSometing(@Body(new FreezsePipe()) body: any) {
    body.test = 23;
  }
}
