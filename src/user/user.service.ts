import { DeleteNotication } from './../post/post.types';
import { CreateUserInput } from './user.types';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
        // const compared = bcrypt.compareSync(comparedPassword, hash); // false

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      ) {}

      //---------------------------- CRUD ----------------------------//

      //---------------------------- Find All ----------------------------//
      async findAll():Promise<UserEntity[]> {
        const foundPost = await this.userRepository.find()
        return foundPost
      }

      //---------------------------- By ID ----------------------------//
      async findUserByID(id:string): Promise<UserEntity | undefined> {  
            const foundPost = await this.userRepository.findOne(id)
            console.log(foundPost)
            if(foundPost) {
              return foundPost;
            } else {
              throw new NotFoundException(`User with an ID:[${id}] is not found`)
          }
      }

      //---------------------------- By Username----------------------------//
      async findByUserName(username:string): Promise<UserEntity | undefined> {
        const foundPost = await this.userRepository.findOne({ userName: username.toLowerCase() })
        if(foundPost) {
          return foundPost;
        } else {
          return null
        }
      }
      
      //---------------------------- Register ---------------------------//
      async register(createRegisterInput: CreateUserInput): Promise<UserEntity | undefined> {
        // Check first if the username is already taken
          const doesUserExistsAlready = await this.findByUserName(createRegisterInput.userName)

            if(doesUserExistsAlready?.userName !== createRegisterInput.userName.toLowerCase()) {
              const mutatedUserInput = {
                ...createRegisterInput,
                userName:createRegisterInput.userName.toLowerCase(),
                password: await bcrypt.hashSync(createRegisterInput.password, salt),
                createdAt: new Date(),
                updatedAt: new Date()
              }
              const savedInput = await this.userRepository.save(mutatedUserInput) 
              return savedInput
            } else {
              throw new NotFoundException(`[${createRegisterInput.userName}] is already taken`)
            }
      }

      //---------------------------- Delete ----------------------------//
      async deleteUser(id:string):Promise<DeleteNotication> {
        const userDoesExit = await this.findUserByID(id)
        if(userDoesExit) {
          await this.userRepository.delete(id) 
          return {
            message: 'Deleted'
          }
        }
      }
   
}
