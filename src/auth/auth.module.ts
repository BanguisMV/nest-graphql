import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'markyboy',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],

})
export class AuthModule {}
