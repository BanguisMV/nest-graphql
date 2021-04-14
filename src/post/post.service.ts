import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from './post.schema';
import { GraphQLError } from 'graphql';
import { CreatePostInput, UpdatePostInput, DeleteNotication } from './post.types';
import {  Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class PostService {

  constructor(
    @InjectModel('Post') private postModel: Model<PostDocument>,

  ) {}


//---------------------------- CRUD Functionality ----------------------------//


//---------------------------- Create ----------------------------//

  async create(createPostInput: CreatePostInput, userID:string) {

    const mutatedPost:any = {
      ...createPostInput,
      author:userID,
      createdAt: new Date(),
      updatedAt: new Date()
    }

      const newPost = await this.postModel.create(mutatedPost) 
      return newPost;
  }

//---------------------------- FindAll ----------------------------//

  async findAll(): Promise<PostDocument[] > {
  
     const populated = await this.postModel.find()
     console.log(populated)
      return populated

  }

//---------------------------- FindOne ----------------------------//

  async findOne(id: string): Promise<PostDocument> {
      const foundPost = await this.postModel.findById(id).populate('author', null).exec()
      if(foundPost) {
        return foundPost;
      } else {
        throw new GraphQLError(`Post with an ID:[${id}] is not found`)
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
     await this.postModel.findByIdAndUpdate(id,body)
     return updatedData; 
    } else {
      throw new GraphQLError(`Post with an ID:[${id}] is not found`)
    }
  }

//---------------------------- Remove ----------------------------//

  async remove(id: string):Promise<DeleteNotication | void>  {
  
    const findFirst = await this.findOne(id)
    if(findFirst) {
      await this.postModel.remove(id)
      return {
        message: 'Deleted'
      } 
    }
  }


}
