import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  userName: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Masum Billal DiPU',
      userName: 'Dipu',
      password: '13325',
    },
    {
      id: 2,
      name: 'Mahmud Sunny',
      userName: 'Sunny',
      password: '123',
    },
  ];
  async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === userName);
  }
}
