import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)  
    private readonly usersRepository: Repository<Usuario>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Estudiante)
    private readonly EstudianteRepository: Repository<Estudiante>,
    @InjectRepository(Profesor)
    private readonly ProfesorRepository: Repository<Profesor>,
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

    // Crear una instancia de Usuario
    const newUser = this.usersRepository.create({
      ...rest,
      contraseña_Usuario: hashedPassword,
      rol_Usuario: rol,
    });

    // Aquí es donde añadimos la lógica para crear Estudiante o Profesor
    if (rol.nombre_Rol.toLocaleLowerCase() === 'Estudiante') {
      // Crear y vincular la entidad Estudiante
      const estudiante = new Estudiante();
      estudiante.usuario = newUser; // Establecer la relación OneToOne

      // Usamos una transacción para asegurar la atomicidad
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(newUser);
        await transactionalEntityManager.save(estudiante);
      });
    } else if (rol.nombre_Rol.toLocaleLowerCase() === 'Profesor') {
      // Crear y vincular la entidad Profesor
      const profesor = new Profesor();
      profesor.usuario = newUser; // Establecer la relación OneToOne

      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(newUser);
        await transactionalEntityManager.save(profesor);
      });
    } else {
      // Si es Admin o SuperAdmin, solo guardamos el usuario
      await this.usersRepository.save(newUser);
    }

    return newUser;
  }

  // Buscar un usuario por su ID
  async findById(id: number): Promise<Usuario> {
    const user = await this.usersRepository.findOne({ where: { id_usuario: id }, relations: ['rol_Usuario', 'estudiante', 'profesor'] });
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
    return this.usersRepository.findOne({ where: { email_Usuario: email }, relations: ['rol_Usuario'] });
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

  // Bloquear o desbloquear un usuario
  async toggleBlockUser(id: number, bloqueado_Usuario: boolean): Promise<Usuario> {
    const user = await this.findById(id); 
    user.bloqueado_Usuario = bloqueado_Usuario;
    return this.usersRepository.save(user); 
  }

  // Actualizar la contraseña de un usuario
  async updatePassword(id_usuario: number,  hashedPassword: string): Promise<void> {
    try {
      console.log('Actualizando contraseña en la base de datos para el usuario:', id_usuario);
  
      // Aquí usamos un objeto con el campo 'contrasenia_Usuario' para actualizar la contraseña
      const resultado = await this.usersRepository.update(
        { id_usuario }, // condición para buscar el usuario
        { contraseña_Usuario: hashedPassword } // objeto que contiene el campo a actualizar
      );
  
      console.log('Resultado de la actualización:', resultado);
  
      if (resultado.affected === 0) {
        throw new Error('No se actualizó ningún registro. Verifica que el ID del usuario es correcto.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña en la base de datos:', error);
      throw new InternalServerErrorException('Error al actualizar la contraseña');
    }
  }
  
}
