import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeRootConfig } from './config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SneakersModule } from './modules/sneakers/sneakers.module';
import { BrandsModule } from './modules/brands/brands.module';
import { TypesModule } from './modules/types/types.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync(SequelizeRootConfig()),
    AuthModule,
    UsersModule,
    SneakersModule,
    BrandsModule,
    TypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
