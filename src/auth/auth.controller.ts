import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email_Usuario: string; contraseña_Usuario: string }) {
    return this.authService.login(loginDto.email_Usuario, loginDto.contraseña_Usuario);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email_Usuario }: { email_Usuario: string }) {
    return this.authService.forgotPassword(email_Usuario);
  }

  @Post('reset-password')
  async resetPassword(@Body() { token, password }: { token: string; password: string }) {
    return this.authService.resetPassword(token, password);
  }
}
