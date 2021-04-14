import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

 constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = await GqlExecutionContext.create(context).getContext()
    if(!ctx.headers.authorization) {
        return false
    }
    ctx.user = await this.validateToken(ctx.headers.authorization)
    return true
  }

 async validateToken(auth:string) {
  
      if(auth.split(' ')[0] !== "Bearer") {
          throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED)
      }
      const token = auth.split(' ')[1]
      try {
          return await this.jwtService.verify(token)
      } catch (error) {
        throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED)
      }

  }
}
