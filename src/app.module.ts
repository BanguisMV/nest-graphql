import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context:(({req}) => ({ 
      headers: req.headers
    }))
  }), 
  MongooseModule.forRoot('mongodb://localhost/blog'), PostModule, UserModule, AuthModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
