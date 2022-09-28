import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { UserRole } from '../dtos/new.user.dto';

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.TECHNICIAN,
    UserRole.SALES,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toLowerCase();

    if (!this.isValidUserRole(value))
      throw new BadRequestException(`Role ${value} is not valid`);
    return value;
  }
  private isValidUserRole(role: any) {
    console.log(this.allowedStatus);
    const idx = this.allowedStatus.indexOf(role);

    return idx !== -1;
  }
}
