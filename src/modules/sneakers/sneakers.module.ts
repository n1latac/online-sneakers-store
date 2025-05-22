import { Module } from '@nestjs/common';
import { SneakersController } from './sneakers.controller';
import { SneakersService } from './sneakers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sneaker } from '../../database/entities/Sneaker.entity';
import { SneakersInfo } from '../../database/entities/SneakersInfo.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Sneaker, SneakersInfo]), UsersModule],
  controllers: [SneakersController],
  providers: [SneakersService],
})
export class SneakersModule {}
