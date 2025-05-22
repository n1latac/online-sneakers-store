import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../database/entities/User.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(@InjectModel(User) private userRepo: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: { id: number; phone: string }) {
    console.log('Payload from token:', payload);
    const user = await this.userRepo.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
