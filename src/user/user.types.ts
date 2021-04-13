import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';


@ObjectType()
export class User {

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

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

}


@InputType()
export class CreateUserInput {


  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  password: string;
  
  @CreateDateColumn({ type: 'timestamp', name: 'created_date', default: () => 'LOCALTIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_date', default: () => 'LOCALTIMESTAMP' })
  updatedAt?: Date;

}


@ObjectType()
export class DeleteNotication {
  @Field({ nullable: true })
  message:string
}
