import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostResolver, PostService],

})
export class PostModule {}
