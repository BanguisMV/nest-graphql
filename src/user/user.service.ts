import { DeleteNotication } from './../post/post.types';
import { CreateUserInput, JWT } from './user.types';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, ObjectID } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
        // const compared = bcrypt.compareSync(comparedPassword, hash); // false

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
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
            if(foundPost) {
              return foundPost;
            } else {
             throw new GraphQLError(`User with an ID:[${id}] is not found`)
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
              throw new GraphQLError('User already exists.')
            }
      }

      //---------------------------- Delete ----------------------------//
      async deleteUser(id:string):Promise<DeleteNotication> {
        const userDoesExist = await this.findUserByID(id)
        if(userDoesExist) {
          await this.userRepository.delete(id) 
          return {
            message: 'Deleted'
          }
        }
      }

      //---------------------------- Generate a JWT token ----------------------------//
      createToken(id:string, username:string):JWT {
        return {
          access_token: this.jwtService.sign({ id,username }),
        }
      }

      //---------------------------- UserLogin ----------------------------//
      async login(username:string, password:string): Promise<JWT> {
        const userDoesExist = await this.findByUserName(username)
     
        if(userDoesExist) {
        const decodedPassword:boolean = await bcrypt.compareSync(password.toLowerCase(),userDoesExist.password); // true or false
        
        if(decodedPassword) {
         // Return the token if decodedPassword is true
          const token = this.createToken(userDoesExist._id, userDoesExist.userName)
          return token
        } else {
          throw new GraphQLError('Password is incorrect')
        }

      } 

      // Return an error if username doesnt exist
      throw new GraphQLError(`USER:[${username}] already doesn't exist`)
    }
}
