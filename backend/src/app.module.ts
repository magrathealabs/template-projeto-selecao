import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

let configService = new ConfigService();

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(configService.get('DB_URL'))],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule { }
