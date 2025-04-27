// src/auth/guards/block.guard.ts
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Usuario } from 'src/users/entities/user.entity';
  
  @Injectable()
  export class BlockGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
      const req = ctx.switchToHttp().getRequest();
      const user = req.user as Usuario;  // inyectado por JwtStrategy
      if (user.bloqueado_Usuario) {
        throw new ForbiddenException('Usuario bloqueado');
      }
      return true;
    }
  }
  