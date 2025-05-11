import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/entities/User.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(@InjectModel(User) private userRepo: typeof User) {
    super({
      jwtFromRequest: (req: Request) => req.cookies['refresh_token'],
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: { id: number }) {
    const user = await this.userRepo.scope(null).findByPk(payload.id);
    if (!user) throw new UnauthorizedException('Refresh token is invalid');
    return user;
  }
}
