import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    // Cambia 'contrasena' a 'contraseña_Usuario'
    if (!user || !user.contraseña_Usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.contraseña_Usuario);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Cambia 'contrasena' a 'contraseña_Usuario'
    const { contraseña_Usuario, ...result } = user;
    return result;
  }

<<<<<<< HEAD
  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
=======
  // Login para generar JWT
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Valida el usuario y las credenciales
    const user = await this.validateUser(email, password);

    // Crear el payload que incluye el rol del usuario
    const payload = { sub: user.id_usuario, email: user.email, rol: user.rol };

    // Genera y retorna el token junto con el rol
    return {
      access_token: this.jwtService.sign(payload),
      message: 'Inicio de sesión exitoso',
      rol: user.rol,  // Asegúrate de incluir el rol aquí
>>>>>>> Cr-branch
    };
  }
}
