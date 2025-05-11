import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../database/entities/User.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtAuthStrategy } from '../../guards/jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../../guards/jwt-refresh.strategy';
import { RefreshGuard } from '../../guards/jwt-refresh.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt-auth' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtAuthStrategy,
    JwtRefreshStrategy,
    RefreshGuard,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
