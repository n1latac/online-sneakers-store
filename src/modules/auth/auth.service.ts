import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../database/entities/User.entity';
import { InjectModel } from '@nestjs/sequelize';
import { SuccessResponseDTO } from '../../responses/successResponse';
import { CreateUserDTO } from '../users/users.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RolesEnum } from '../../enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,

    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(data: CreateUserDTO) {
    const existUser = await this.usersService.getUserByEmail(data.email);
    if (existUser) {
      throw new BadRequestException('User with this email already exists.');
    }
    const user = await this.usersService.createUser(data);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepo.scope(null).findByPk(userId);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException();
    }
    console.log({ refreshToken, test: user.refresh_token });

    const isMatch = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(
      { refresh_token: hash },
      { where: { id: userId } },
    );
  }

  private async generateTokens(id: number, email: string, role: string) {
    const payload = { id, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
