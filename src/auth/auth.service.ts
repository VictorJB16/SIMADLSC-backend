import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto'; 

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    
    const dummyUser = {
      email: 'test@example.com',
      password: 'password123', 
    };

   
    if (email !== dummyUser.email || password !== dummyUser.password) {
      
      throw new BadRequestException('Credenciales inválidas');
    }

    return { message: 'Inicio de sesión exitoso' };
  }
}
