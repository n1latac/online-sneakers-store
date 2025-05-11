import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeBrand } from '../database/entities/TypeBrand.entity';
import { Type } from '../database/entities/Type.entity';
import { SneakersInfo } from '../database/entities/SneakersInfo.entity';
import { Sneaker } from '../database/entities/Sneaker.entity';
import { Rating } from '../database/entities/Rating.entity';
import { Brand } from '../database/entities/Brand.entity';
import { Basket } from '../database/entities/Basket.entity';
import { BasketSneaker } from '../database/entities/BasketSneaker.entity';
import { User } from '../database/entities/User.entity';
import { ModelCtor } from 'sequelize-typescript';

const models = [
  User,
  TypeBrand,
  Type,
  SneakersInfo,
  Sneaker,
  Rating,
  Brand,
  Basket,
  BasketSneaker,
];

export const SequelizeRootConfig = (): SequelizeModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): SequelizeModuleOptions => {
      console.log('Connecting to DB:', configService.get('DB_NAME'));
      return {
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: models as ModelCtor[],
        define: {
          timestamps: true,
        },
        logging: console.log,
      };
    },
    inject: [ConfigService],
  };
};
