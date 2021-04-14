import { UserEntity } from './../user/user.entity';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectID, OneToMany } from 'typeorm';

@Entity("posts")
export class PostEntity {

  @ObjectIdColumn()
  _id?: ObjectID;

  @Column()
  content: string;

  @OneToMany(type => UserEntity, user => user._id)
  author: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
