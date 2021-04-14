import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), JwtModule.register({
    secret: 'markyboy',
    signOptions: { expiresIn: '1h' },
  }), UserModule],
  providers: [PostResolver, PostService],

})
export class PostModule {}
