import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../database/entities/User.entity';
import { Type } from '../../database/entities/Type.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Type])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
