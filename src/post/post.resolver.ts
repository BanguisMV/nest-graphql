import { UserService } from './../user/user.service';
import { PostEntity } from './post.entity';
import { AuthGuard } from './../auth/auth.guard';
import { Post, CreatePostInput, UpdatePostInput, DeleteNotication } from './post.types';
import { Resolver, Query, Args,Mutation, Context, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.types';

@Resolver(() => Post)

export class PostResolver {
  constructor(private readonly postService: PostService, private readonly userService: UserService) {}

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput, @Context('user') user:any) {
    return this.postService.create(createPostInput, user.id);
  }
  
  @Query(() => [Post], { name: 'posts' })
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }


  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('id') id: string, @Args('body') body:UpdatePostInput ) {
    return this.postService.update(id,body);
  }

  @Mutation(() => DeleteNotication)
  deletePost(@Args('id') id: string): Promise<DeleteNotication | void> {
    return this.postService.remove(id);
  }

  @ResolveField(() => User, { name: 'author' })
  async author(@Parent() parent: any) {
    console.log(parent)
    const { author } = parent;
    return this.userService.findUserByID( author );
  }
}
