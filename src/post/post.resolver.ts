import { PostDocument } from './post.schema';
import { UserService } from './../user/user.service';
import { AuthGuard } from './../auth/auth.guard';
import { Post, CreatePostInput, UpdatePostInput, DeleteNotication } from './post.types';
import { Resolver, Query, Args,Mutation, Context, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards, CanActivate } from '@nestjs/common';
import { UserType } from 'src/user/user.types';

@Resolver(() => Post)

export class PostResolver {
  constructor(private readonly postService: PostService, private readonly userService: UserService) {}

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput, @Context('user') user:any) {
    return this.postService.create(createPostInput, user.id);
  }
  
  @Query(() => [Post], { name: 'posts' })
  findAll(): Promise<PostDocument[]> {
    return this.postService.findAll();
  }


  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<PostDocument> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  updatePost(@Args('id') id: string, @Args('body') body:UpdatePostInput, 
            @Context('user') user:UserType ) {
    return this.postService.update(id,body,user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => DeleteNotication)
  deletePost(@Args('id') id: string, 
            @Context('user') user:UserType): Promise<DeleteNotication | void> {
    return this.postService.remove(id,user);
  }

  @ResolveField(() => UserType, { name: 'author' })
  async author(@Parent() parent: any) {
    const { author } = parent;
    return this.userService.findUserByID( author );
  }
}
