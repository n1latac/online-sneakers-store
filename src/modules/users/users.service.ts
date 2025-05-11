import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/User.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
  ) {}

  async createUser(
    data: CreateUserDTO,
  ): Promise<Omit<User, 'password' | 'refresh_token'>> {
    data.password = await this.hashPassword(data.password);
    const userInstance = await this.userRepo.create({
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      password: data?.password,
      role: data?.role || 'customer',
    });
    const user = userInstance.get({ plain: true });

    delete user.password;
    delete user.refresh_token;
    return user;
  }

  public hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }
}
