import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
    secret: 'markyboy',
    signOptions: { expiresIn: '1h' },
  }) ],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
