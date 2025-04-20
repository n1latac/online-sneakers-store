import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeRootConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(SequelizeRootConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
