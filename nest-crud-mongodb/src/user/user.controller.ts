import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/rules.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from './dtos/new.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put(':id/role')
  updateRoleOfUser(@Param('id') id: string, @Body() role: UserRole) {
    console.log(id, role);
    // this.userService.updateRoleOfUser(id, role)
    return 'kjfkfpifpokif';
  }
}
