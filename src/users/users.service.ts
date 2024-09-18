import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usersRepository: Repository<Usuario>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
    const { contraseña_Usuario, rol_Usuario, ...rest } = createUserDto;

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contraseña_Usuario, 10);

    // Buscar el rol en la base de datos
    const rol = await this.rolesRepository.findOne({ where: { id_Rol: rol_Usuario } });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${rol_Usuario} no encontrado`);
    }

    const newUser = this.usersRepository.create({
      ...rest,
      contraseña_Usuario: hashedPassword,
      rol_Usuario: rol,
    });

    return this.usersRepository.save(newUser);
  }

  // Buscar un usuario por su ID
  async findById(id: number): Promise<Usuario> {
    const user = await this.usersRepository.findOne({ where: { id_usuario: id }, relations: ['rol_Usuario'] });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Buscar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usersRepository.find({ relations: ['rol_Usuario'] });
  }

  // Buscar un usuario por email
  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.usersRepository.findOne({ where: { email_Usuario: email },relations: ['rol_Usuario'], });
  }

  // Actualizar un usuario por su ID
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Usuario> {
    const user = await this.findById(id);

    // Si se proporciona una contraseña nueva, la ciframos
    if (updateUserDto.contraseña_Usuario) {
      updateUserDto.contraseña_Usuario = await bcrypt.hash(updateUserDto.contraseña_Usuario, 10);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}
