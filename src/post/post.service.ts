import { UserType } from 'src/user/user.types';
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

      const newPost =  new this.postModel(mutatedPost) 
      newPost.save()
      return newPost;
  }

//---------------------------- FindAll ----------------------------//

  async findAll(): Promise<PostDocument[] > {
  
     const populated = await this.postModel.find().populate('author', null).exec()
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

  async update(id: string, body:UpdatePostInput, user:any) {
    const findFirst = await this.findOne(id)
    // Find first if the post exist
    // then compare the current user id to the author id of the post
    if(findFirst?.author._id.toString() === user.id.toString()) {
     const updated = await this.postModel.findByIdAndUpdate(id,body)
     return updated; 
    } else if (!findFirst) {
            // if posts doesnt exists then throw another error
      throw new GraphQLError(`Post with an ID:[${id}] is not found`)
    } else {
     //throw unathorized, 
      throw new GraphQLError(`Unathorized`)
    }
  }

//---------------------------- Remove ----------------------------//

  async remove(id: string, user:any):Promise<DeleteNotication | void>  {
    const findFirst = await this.findOne(id)
    if(findFirst?.author._id.toString()  === user.id.toString() ) {
      await this.postModel.remove({ _id:id })
      return {
        message: 'Deleted'
      } 
    } else {
      throw new GraphQLError(`Unathorized`)
    }
  }


}
