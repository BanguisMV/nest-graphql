import { ObjectIdColumn } from 'typeorm';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {

  @Field(type => ID)
  @ObjectIdColumn()
  _id: string;

}
