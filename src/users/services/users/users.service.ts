import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, UpdateUserParams } from 'src/utils/types';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Posts';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>,
                @InjectRepository(Post) private postRepository: Repository<Post>){}
    findUsers(){
        return this.userRepository.find({relations: ['profile','posts']})
    }
    createUser(userDetails: CreateUserParams){
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date(),});
        return this.userRepository.save(newUser)
    }
    updateUser(id: number, updateUserDetails: UpdateUserParams){
        this.userRepository.update({ id },{...updateUserDetails});
    }
    deleteUser(id: number){
        this.userRepository.delete({id})
    }
    async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileDto){
        const user = await this.userRepository.findOneBy({id});
        if(!user)
            throw new HttpException(
        'user not found cant create profile', HttpStatus.BAD_REQUEST);
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile
        return this.userRepository.save(user)
    }
    async createUserPost(id: number,createUserPostDetails: CreateUserPostParams){
        const user = await this.userRepository.findOneBy({id});
        if(!user)
            throw new HttpException('user not found create profile',
        HttpStatus.BAD_REQUEST,)
        const newPost = this.postRepository.create({...createUserPostDetails, user });
        return await this.postRepository.save(newPost);
    }
}
