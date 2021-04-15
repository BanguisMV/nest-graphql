import { Post } from './../post/post.types';
import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';


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
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {message:"Firstname is too long. 100 Characters Only"})
  firstName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {message:"Lastname is too long. 100 Characters Only"})
  lastName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {message:"Username is too short. 5 Characters is the minimum"})
  @MaxLength(100, {message:"Username is too long. 100 Characters Only"})
  userName?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {message:"Password is too short. 5 Characters is the minimum"})
  @MaxLength(1500, {message:"Password is too long, 120 Characters Only"})
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
