import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<Users>,
  ) {}

  async onModuleInit() {
    await this.addDefaultAdmin();
  }

  private async addDefaultAdmin() {
    const admin = await this.userModel.findOne({ username: 'admin' }).exec();
    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new this.userModel({
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
      });
      await newAdmin.save();
    }
  }

  async findOne(
    email: string,
    password: string,
  ): Promise<Users | undefined | string> {
    try {
      const user = await this.userModel.findOne({
        email,
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }
}
