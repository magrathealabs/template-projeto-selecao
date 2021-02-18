import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

let configService = new ConfigService();

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(configService.get('DB_URL'))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
