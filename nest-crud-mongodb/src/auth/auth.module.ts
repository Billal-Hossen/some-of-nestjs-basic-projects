import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RefreshTokenStrategy } from './guards/refreshToken.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'sectret',
        signOptions: { expiresIn: '60S' },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
