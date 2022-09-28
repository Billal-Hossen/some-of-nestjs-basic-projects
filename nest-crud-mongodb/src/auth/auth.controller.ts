import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { ExistingUserDTO } from 'src/user/dtos/existing-user-dto';
import { UserRole } from 'src/user/dtos/new.user.dto';
import { UserRoleValidationPipe } from 'src/user/pipes/role.validation.pipe';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async resister(@Body() user: CreateUserDto) {
    console.log(user);
    return this.authService.resister(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body('role', UserRoleValidationPipe) role: UserRole,
  ) {
    return await this.authService.updateUserRole(id, role);
  }
}
