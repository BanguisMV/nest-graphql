import { UserEntity } from './user.entity';
import { AuthGuard } from './../auth/auth.guard';
import { DeleteNotication } from './../post/post.types';
import { UserService } from './user.service';
import { User, CreateUserInput, JWT } from './user.types';
import { Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

@Resolver(() => User)
@Injectable()
export class UserResolver {

  constructor(private readonly userService: UserService) {}


  @Mutation(() => User)
  register(@Args('registerInput') createRegisterInput: CreateUserInput):Promise<UserEntity> {
    return this.userService.register(createRegisterInput);
  }

  @Mutation(() => DeleteNotication)
  deleteUser(@Args('id') id: string):Promise<DeleteNotication> {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => JWT,{ name: 'login', description:"Login" })
  login(@Args('username') username: string, @Args('password') password:string ) {
    return this.userService.login(username, password);
  }

  @Query(() => User, { name: 'user', description:"Find One User" })
  findByUserName(@Args('id', { nullable:true }) id: string):Promise<UserEntity> {
       return this.userService.findUserByID(id);
  }
  
  @UseGuards(AuthGuard)
  @Query(() =>[User], { name: 'users', description:"Find Many Users" })
  findManyUsers(@Context('user') user:any):Promise<UserEntity[]> {
    return this.userService.findAll();
  }

}
