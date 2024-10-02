import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email_Usuario: string; contraseña_Usuario: string }) {
    return this.authService.login(loginDto.email_Usuario, loginDto.contraseña_Usuario);
  }

  // auth.controller.ts
@Post('forgot-password')
async forgotPassword(@Body() { email_Usuario }: { email_Usuario: string }) {
  return this.authService.forgotPassword(email_Usuario);
  
}


@Post('reset-password')
async resetPassword(@Body() resetPasswordDto): Promise<{ message: string; }> {
  try {
    await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.contraseña_Usuario);
    return { message: 'Contraseña restablecida con éxito' };
  } catch (error) {
    console.error('Error en resetPassword:', error);
    throw new BadRequestException(error.message || 'Error al restablecer la contraseña');
  }
}
}