export class NewUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
  TECHNICIAN = 'technician',
  CUSTOMER = 'customer',
}
