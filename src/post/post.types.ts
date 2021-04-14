import { User } from './../user/user.types';
import { CreateDateColumn, UpdateDateColumn, ObjectID, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Post {

  @Field(type => ID,{ nullable: true })
  _id?: ObjectID;

  @Field()
  content: string;

  @Field(type => User)
  author: User;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

}


@InputType()
export class CreatePostInput {

  @Field()
  content: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_date', default: () => 'LOCALTIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_date', default: () => 'LOCALTIMESTAMP' })
  updatedAt?: Date;

}

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {

    @Field({ nullable: true })
    @UpdateDateColumn()
    updatedAt?: Date;
    
}
  
@ObjectType()
export class DeleteNotication {
  @Field({ nullable: true })
  message:string
}