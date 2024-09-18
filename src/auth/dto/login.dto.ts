import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email_Usuario: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
<<<<<<< HEAD
  contraseña_Usuario: string;
=======
  password: string;

>>>>>>> Cr-branch
}
