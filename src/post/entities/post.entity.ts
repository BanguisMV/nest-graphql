import { ObjectType, Field, ID  } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity("posts")
export class Post {

  @Field(type => ID)
  @ObjectIdColumn()
  _id?: string;



  @Field()
  @Column()
  body: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;


  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;

}
