import { User } from './../user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({type: Date})
  createdAt?: Date;

  @Prop({type: Date})
  updatedAt?: Date;

}

export const PostSchema = SchemaFactory.createForClass(Post);