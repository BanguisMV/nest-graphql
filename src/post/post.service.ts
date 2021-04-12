import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

 async create(createPostInput: CreatePostInput) {
    const newPost = await this.postRepository.save(createPostInput)
    console.log(newPost)
    return newPost;
  }

 async findAll() {
  const foundPost = await this.postRepository.find()
  return foundPost;
}

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
