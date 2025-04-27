import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'; // Asegúrate de importar desde jsonwebtoken
import { MailerCustomService } from 'src/mailer/mailer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerCustomService,
  ) {}

   // Validación de credenciales del usuario
  async validateUser(email_Usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email_Usuario);
    if (!user || !user.contraseña_Usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
       // ← NUEVO: impide el login si está bloqueado
   if (user.bloqueado_Usuario) {
    throw new ForbiddenException('Tu cuenta está bloqueada');
   }

    const isPasswordValid = await bcrypt.compare(password, user.contraseña_Usuario);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const { contraseña_Usuario, ...result } = user;

    return result;
    
  }


  async login(email_Usuario: string, password: string) {
    // 1. Validar credenciales
    const user = await this.validateUser(email_Usuario, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  
    // 2. Obtener el array de materias (si el usuario es profesor)
    //    user.profesor.id_Materia es un array de objetos Materia
    //    Cada objeto Materia tiene su propio 'id_Materia' (número)
    const materiasProfesor = user.profesor?.id_Materia?.map(m => m.id_Materia) ?? [];
  
    // 3. Construir el payload
    const payload = {
      sub: user.id_usuario,
      email: user.email_Usuario,
      nombre: user.nombre_Usuario,
      apellido1: user.apellido1_Usuario,
      apellido2: user.apellido2_Usuario,
      rol: user.rol_Usuario?.nombre_Rol,
      id_Profesor: user.profesor?.id_Profesor ?? null,
      id_Estudiante: user.estudiante?.id_Estudiante ?? null,
      materia: materiasProfesor, // <-- Aquí los IDs de las materias
    };
  
    // 4. Firmar el JWT
    const access_token = this.jwtService.sign(payload);
  
    // 5. Retornar el token, el rol y el payload
    return {
      access_token,
      role: user.rol_Usuario?.nombre_Rol,
      payload,
    };
  }


  async forgotPassword(email_Usuario: string) {
    const user = await this.usersService.findByEmail(email_Usuario);
    if (!user) {
      throw new NotFoundException(`No se encontró ningún usuario para el correo electrónico: ${email_Usuario}`);
    }
  
    // Generar un nuevo token de restablecimiento de contraseña cada vez que el usuario lo solicite
    const resetToken = this.jwtService.sign(
      { email_Usuario },
      { secret: process.env.JWT_RESET_PASSWORD_SECRET, expiresIn: '8h' }
    );
  
// Asegúrate de que el valor de FRONTEND_URL en .env no incluye la ruta `reset-password`
const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${encodeURIComponent(resetToken)}`;

    // Envía un correo al usuario con el nuevo token
    await this.mailerService.sendResetPasswordEmail(user.email_Usuario, resetToken, user.nombre_Usuario);
  
    return {
      message: 'Se ha enviado un correo para restablecer tu contraseña.',
    };
  }

  // Restablecer la contraseña con el token
  async resetPassword(token: string, nuevaContraseña: string) {
    console.log('Iniciando resetPassword con token:', token);
    try {
      // Intentamos verificar el token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
      });
  
      // Buscamos al usuario usando el email del payload
      const email_Usuario = payload.email_Usuario;
      const user = await this.usersService.findByEmail(email_Usuario);
      if (!user) {
        throw new NotFoundException(`No se encontró un usuario con el email: ${email_Usuario}`);
      }
  
      // Encriptamos la nueva contraseña
      const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
  
      // Actualizamos la contraseña en la base de datos
      await this.usersService.updatePassword(user.id_usuario, hashedPassword);
  
    } catch (error) {
      // Verificamos el tipo de error
      if (error instanceof TokenExpiredError) {
        console.error('Error: El token ha caducado.', error);
        throw new BadRequestException('El token ha expirado. Por favor, solicite uno nuevo.');
      } else if (error instanceof JsonWebTokenError) {
        console.error('Error: El token es inválido.', error);
        throw new BadRequestException('El token es inválido.');
      } else {
        console.error('Error inesperado en resetPassword:', error);
        throw new InternalServerErrorException('Ocurrió un error al restablecer la contraseña.');
      }
    }
  }
}
