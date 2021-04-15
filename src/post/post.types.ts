import { IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';
import { UserType } from './../user/user.types';
import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Post {

  @Field(type => ID,{ nullable: true })
  _id?: string;

  @Field()
  content: string;

  @Field(type => UserType)
  author: UserType;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

}


@InputType()
export class CreatePostInput {

  @Field()
  @IsNotEmpty()
  @MaxLength(500, {message:"Content is too long"})
  content: string;

}

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  
    @Field({ nullable: true })
    createdAt?:Date;

    @Field({ nullable: true })
    updatedAt?: Date;
    
}
  
@ObjectType()
export class DeleteNotication {
  @Field({ nullable: true })
  message:string
}