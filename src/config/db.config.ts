import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

const models = [];

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
        models,
        define: {
          timestamps: true,
        },
        logging: console.log,
      };
    },
    inject: [ConfigService],
  };
};
