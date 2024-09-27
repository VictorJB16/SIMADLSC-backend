import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailerCustomService } from 'src/mailer/mailer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerCustomService,
  ) {}

  // Validar el usuario y la contraseña
  async validateUser(email_Usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email_Usuario);

    if (!user || !user.contraseña_Usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.contraseña_Usuario);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { contraseña_Usuario, ...result } = user;
    return result;
  }

  // Generar el token JWT
  async login(email_Usuario: string, password: string) {
    const user = await this.validateUser(email_Usuario, password);

    const payload = {
      sub: user.id_usuario,
      email: user.email_Usuario,
      nombre: user.nombre_Usuario,
      apellido1: user.apellido1_Usuario,
      apellido2: user.apellido2_Usuario,
      rol: user.rol_Usuario.nombre_Rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.rol_Usuario.nombre_Rol,
    };
  }

  async forgotPassword(email_Usuario: string) {
    const user = await this.usersService.findByEmail(email_Usuario);
    if (!user) {
      throw new NotFoundException(`No se encontró ningún usuario para el correo electrónico: ${email_Usuario}`);
    }

    const resetToken = this.jwtService.sign({ email_Usuario }, { secret: 'JWT_RESET_PASSWORD_SECRET', expiresIn: '1h' });
    await this.mailerService.sendResetPasswordEmail(user.email_Usuario, resetToken, user.nombre_Usuario);
  }

  // Restablecer la contraseña con el token
  async resetPassword(token: string, newPassword: string) {
    let email_Usuario: string;
    try {
      const payload = this.jwtService.verify(token, { secret: 'JWT_RESET_PASSWORD_SECRET' });
      email_Usuario = payload.email_Usuario;
    } catch (error) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const user = await this.usersService.findByEmail(email_Usuario);
    if (!user) {
      throw new NotFoundException(`No se encontró ningún usuario para el correo electrónico: ${email_Usuario}`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(user.id_usuario, hashedPassword);
  }

}
