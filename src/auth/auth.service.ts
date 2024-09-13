import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida el usuario y la contraseña
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas (usuario no encontrado)');
    }

    // Verifica si la contraseña está definida antes de compararla
    if (!user.contrasena) {
      throw new UnauthorizedException('Usuario sin contraseña registrada');
    }

    // Compara la contraseña con la almacenada en la base de datos (usando bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas (contraseña incorrecta)');
    }

    // Excluye la contraseña del objeto que se retorna
    const { contrasena, ...result } = user;
    return result;
  }

  // Login para generar JWT
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Valida el usuario y las credenciales
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id_usuario, email: user.email, rol: user.rol };

    // Genera y retorna el token
    return {
      access_token: this.jwtService.sign(payload),
      message: 'Inicio de sesión exitoso',
    };
  }
}
