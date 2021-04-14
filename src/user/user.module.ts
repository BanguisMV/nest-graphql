import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './../post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'User', schema: UserSchema }]),
    JwtModule.register({
    secret: 'markyboy',
    signOptions: { expiresIn: '1h' },
  }),forwardRef(() => PostModule)  ],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
