import { CreateDateColumn } from 'typeorm';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {

  @Field()
  body: string;

  
  @CreateDateColumn()
  createdAt: Date;


  @CreateDateColumn()
  updatedAt: Date;

}
