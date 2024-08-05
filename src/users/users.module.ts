import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Posts';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile,Post])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}