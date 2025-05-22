import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from '../../database/entities/Brand.entity';
import { User } from '../../database/entities/User.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand, User])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
