import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
  }), 
  TypeOrmModule.forRoot({
    type: 'mongodb',
    url:'mongodb://localhost:27017/blog',
    synchronize: true,
    useUnifiedTopology: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  }), PostModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
