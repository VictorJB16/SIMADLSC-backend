import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validar el usuario y la contraseña
  async validateUser(email_Usuario: string, password: string): Promise<any> {
    // Buscar el usuario por su email
    const user = await this.usersService.findByEmail(email_Usuario);

    // Verificar si el usuario existe y tiene una contraseña válida
    if (!user || !user.contraseña_Usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Comparar la contraseña ingresada con la almacenada (cifrada)
    const isPasswordValid = await bcrypt.compare(password, user.contraseña_Usuario);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Si las credenciales son válidas, devolver el usuario sin la contraseña
    const { contraseña_Usuario, ...result } = user;
    return result;
  }

  // Generar el token JWT y devolver el nombre del rol
  async login(email_Usuario: string, password: string) {
    // Validar al usuario
    const user = await this.validateUser(email_Usuario, password);

    // Si la validación es correcta, generar el token JWT
    const payload = {
      email: user.email_Usuario,   // Email del usuario
      sub: user.id,                // ID del usuario
      rol: user.rol_Usuario.nombre_Rol  // Nombre del rol
    };

    // Devolver el token y el nombre del rol
    return {
      access_token: this.jwtService.sign(payload),  // Generar el token con el payload
      role: user.rol_Usuario.nombre_Rol  // Devolver el nombre del rol
    };
  }
}
