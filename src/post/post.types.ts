import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class Post {

  @Field(type => ID)
  _id?: string;

  @Field()
  content: string;

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