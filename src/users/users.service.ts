import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
    const { contrasena, ...rest } = createUserDto;

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = this.usersRepository.create({ ...rest, contrasena: hashedPassword });

    return this.usersRepository.save(newUser);
  }

  // Buscar un usuario por su ID
  async findById(id: number): Promise<Usuario> {
    const user = await this.usersRepository.findOne({ where: { id_usuario: id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
  

  // Buscar un usuario por email (usado para login)
  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Actualizar un usuario por su ID
  async updateUser(id: number, updateUserDto: Partial<Usuario>): Promise<Usuario> {
    const user = await this.findById(id); // Verifica si el usuario existe
    const updatedUser = { ...user, ...updateUserDto };

    return this.usersRepository.save(updatedUser);
  }
}
