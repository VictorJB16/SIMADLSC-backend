import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    const user = req.user;

    if (!user) {
      return { message: 'Usuario no autenticado' };
    }

    return {
      nombre_Usuario: user.nombre_Usuario,        
      apellido1_Usuario: user.apellido1_Usuario, 
      apellido2_Usuario: user.apellido2_Usuario, 
      email_Usuario: user.email_Usuario,         
      nombre_Rol: user.rol_Usuario?.nombre_Rol || 'Sin rol asignado',  
    };
  }
}
