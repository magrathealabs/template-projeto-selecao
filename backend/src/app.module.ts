import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


let configService = new ConfigService();

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(configService.get('DB_URL')),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'web')})
  ]
})
export class AppModule { }
