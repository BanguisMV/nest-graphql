import { CreatePostInput, UpdatePostInput, DeleteNotication } from './post.types';
import { PostEntity } from './post.entity';
import {  Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}


//---------------------------- CRUD Functionality ----------------------------//


//---------------------------- Create ----------------------------//

  async create(createPostInput: CreatePostInput): Promise<PostEntity> {

    const mutatedPost = {
      ...createPostInput,
      createdAt: new Date(),
      updatedAt: new Date()
    }

      const newPost = await this.postRepository.save(mutatedPost) 
      return newPost;
  }

//---------------------------- FindAll ----------------------------//

  async findAll(): Promise<PostEntity[]> {
    const foundPost = await this.postRepository.find()
    return foundPost;
  }

//---------------------------- FindOne ----------------------------//

  async findOne(id: string): Promise<PostEntity> {
      const foundPost = await this.postRepository.findOne(id)
      if(foundPost) {
        return foundPost;
      } else {
        throw new NotFoundException(`Post with an ID:[${id}] is not found`)
      }
  }

//---------------------------- UpdateOne ----------------------------//

  async update(id: string, body:UpdatePostInput) {
    const findFirst = await this.findOne(id)
    if(findFirst) {
      const updatedData = {
        ...findFirst,
        ...body,
        updatedAt: new Date()
      }
     await this.postRepository.update(id,updatedData)
     return updatedData; 
    } else {
     throw new NotFoundException(`Post with an ID:[${id}] is not found`)
    }
  }

//---------------------------- Remove ----------------------------//

  async remove(id: string):Promise<DeleteNotication | void>  {
  
    const findFirst = await this.findOne(id)
    if(findFirst) {
      await this.postRepository.delete(id)
      return {
        message: 'Deleted'
      } 
    }
  }


}
