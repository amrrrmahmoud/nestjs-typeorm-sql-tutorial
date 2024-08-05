import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Posts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService)=>({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Profile, Post],
        synchronize: true,
    }),

      }),
      
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    expandVariables: true
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}