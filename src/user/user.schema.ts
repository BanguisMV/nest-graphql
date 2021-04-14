import { Post } from './../post/post.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    firstName: string;
  
    @Prop()
    lastName: string;
  
    @Prop()
    userName: string;

    @Prop()
    password: string;
  
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];
  
    @Prop({type: Date})
    createdAt?: Date;
  
    @Prop({type: Date})
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);