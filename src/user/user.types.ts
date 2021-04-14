import { Post } from './../post/post.types';
import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';


@ObjectType()
export class UserType {

  @Field(type => ID, { nullable: true })
  _id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field(type => [Post],{ nullable: true })
  posts: Post[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

}


@InputType()
export class CreateUserInput {


  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  userName?: string;

  @Field()
  password?: string;

}

@InputType()
export class UpdateUser extends PartialType(CreateUserInput) {

  @Field()
  updatedAt?: Date;

}

@ObjectType()
export class DeleteNotication {
  @Field({ nullable: true })
  message:string
}


@ObjectType()
export class JWT {
  @Field({ nullable: true })
  access_token:string
}
