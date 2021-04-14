import { PostSchema } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './../user/user.module';
import { JwtModule } from '@nestjs/jwt';;
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
  MongooseModule.forFeature([{name:'Post', schema: PostSchema }]),
  JwtModule.register({
    secret: 'markyboy',
    signOptions: { expiresIn: '1h' },
  }), UserModule],
  providers: [PostResolver, PostService],
  exports:[PostService]
})
export class PostModule {}
