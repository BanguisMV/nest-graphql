import { DeleteNotication } from './../post/post.types';
import { UserService } from './user.service';
import { User, CreateUserInput } from './user.types';
import { Injectable } from '@nestjs/common';
import { Resolver, Query, Args,Mutation } from '@nestjs/graphql';

@Resolver(() => User)
@Injectable()
export class UserResolver {

  constructor(private readonly userService: UserService) {}


  @Mutation(() => User)
  register(@Args('registerInput') createRegisterInput: CreateUserInput):Promise<User> {
    return this.userService.register(createRegisterInput);
  }

  @Mutation(() => DeleteNotication)
  deleteUser(@Args('id') id: string):Promise<DeleteNotication> {
    return this.userService.deleteUser(id);
  }

  @Query(() => User, { name: 'user', description:"Find One User" })
  findByUserName(@Args('id', { nullable:true }) id: string):Promise<User> {
       return this.userService.findUserByID(id);
  }

  @Query(() =>[User], { name: 'users', description:"Find Many Users" })
  findManyUsers():Promise<User[]> {
    return this.userService.findAll();
  }

  
}
