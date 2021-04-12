import { Post, CreatePostInput, UpdatePostInput, DeleteNotication } from './post.types';
import { Resolver, Query, Args,Mutation } from '@nestjs/graphql';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }
  
  @Query(() => [Post], { name: 'posts' })
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }


  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Post> {
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

}
