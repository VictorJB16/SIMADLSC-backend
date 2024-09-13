import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auths/jwt-auths.guard';

@Controller('profile')  // Define la ruta base /profile
export class ProfileController {
  @UseGuards(JwtAuthGuard)  // Protege la ruta con JWT
  @Get()
  getProfile(@Request() req) {
    return {
      userId: req.user.userId,
      email: req.user.email,
      rol: req.user.rol,
    };
  }
}
