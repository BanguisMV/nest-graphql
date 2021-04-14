import { User } from './user.schema';
import { PostService } from './../post/post.service';
import { DeleteNotication, Post } from './../post/post.types';
import { UserService } from './user.service';
import { UserType, CreateUserInput, JWT,} from './user.types';
import { Injectable } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';

@Resolver(() => UserType)
@Injectable()
export class UserResolver {

  constructor(private readonly userService: UserService,private readonly postService: PostService) {}


  @Mutation(() => UserType)
  registerUser(@Args('registerInput') createRegisterInput: CreateUserInput):Promise<User> {
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

  @Query(() => UserType, { name: 'user', description:"Find One User" })
  findByUserName(@Args('id', { nullable:true }) id: string):Promise<User> {
       return this.userService.findUserByID(id);
  }
  
  @Query(() =>[UserType], { name: 'users', description:"Find Many Users" })
  findManyUsers():Promise<User[]> {
    return this.userService.findAll();
  }

  // @ResolveField(() =>[UserType], { name: 'posts'})
  // async posts(@Parent() parent: any) {
  //   return this.postService.findAll()
  // }

}
