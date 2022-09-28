import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { AuthenticationMiddleware } from './middleware/authencation.middleware';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LogginInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*'); //{path:"/path",method:RequestMethod.GET}
  }
}
