import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from './dtos/new.user.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { UserDetasils } from './user-interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetasils {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id: id });
  }
  createUser(
    name: string,
    email: string,
    hashPassword: string,
  ): Promise<UserDocument | any> {
    const newUser = new this.userModel({
      name,
      email,

      password: hashPassword,
      role: UserRole.CUSTOMER,
    });
    console.log('first', newUser);
    return newUser.save();
  }

  /// testing
  updateRoleOfUser(id: string, role: UserRole) {
    return this.userModel.updateOne({ _id: id, role });
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
}
