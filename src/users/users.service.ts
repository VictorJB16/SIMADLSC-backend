import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';

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
    @InjectRepository(Grado)
    private readonly GradoRepository: Repository<Grado>,
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      const { nombre_Usuario, apellido1_Usuario, apellido2_Usuario, email_Usuario, contraseña_Usuario, rol_Usuario } = createUserDto;
  
      // Buscar el rol en la base de datos
      const rol = await this.rolesRepository.findOne({ where: { id_Rol: rol_Usuario } });
      if (!rol) {
        throw new Error('Rol no encontrado');
      }
  
      // Crear una instancia del usuario
      const usuario = new Usuario();
      usuario.nombre_Usuario = nombre_Usuario;
      usuario.apellido1_Usuario = apellido1_Usuario;
      usuario.apellido2_Usuario = apellido2_Usuario;
      usuario.email_Usuario = email_Usuario;
      usuario.contraseña_Usuario = await bcrypt.hash(contraseña_Usuario, 10);
      usuario.rol_Usuario = rol;
  
      // Guardar el usuario en la base de datos
      const savedUser = await this.usersRepository.save(usuario);
      console.log('Usuario creado con ID:', savedUser.id_usuario); // Verificar que se haya creado correctamente
      // Crear una entidad `Estudiante` o `Profesor` según el rol
      if (rol_Usuario === 3) { // Si el rol es profesor
        const profesor = new Profesor();
        profesor.usuario = savedUser; // Relacionar el profesor con el usuario recién creado
        profesor.nombre_Profesor = nombre_Usuario;
        profesor.apellido1_Profesor = apellido1_Usuario;
        profesor.apellido2_Profesor = apellido2_Usuario;
        const savedProfesor = await this.ProfesorRepository.save(profesor);
        console.log('Profesor creado con ID:', savedProfesor.id_Profesor); // Verificar que se haya creado correctamente
        console.log('Profesor guardado:', savedProfesor);

      } 
  
      return savedUser; // Devuelve el usuario creado
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }
  

  async createUserAsStudent(
    createUserDto: CreateUserDto,
    createEstudianteDto: CreateEstudianteDto
  ): Promise<{ usuario: Usuario, estudiante: Estudiante }> {
    try {
      const { nombre_Usuario, apellido1_Usuario, apellido2_Usuario, email_Usuario, contraseña_Usuario, rol_Usuario } = createUserDto;
  
      if (rol_Usuario !== 4) {
        throw new Error('Rol incorrecto: Se esperaba el rol de estudiante');
      }
  
      const rol = await this.rolesRepository.findOne({ where: { id_Rol: rol_Usuario } });
      if (!rol) {
        throw new Error('Rol no encontrado');
      }
  
      const usuario = new Usuario();
      usuario.nombre_Usuario = nombre_Usuario;
      usuario.apellido1_Usuario = apellido1_Usuario;
      usuario.apellido2_Usuario = apellido2_Usuario;
      usuario.email_Usuario = email_Usuario;
      usuario.contraseña_Usuario = await bcrypt.hash(contraseña_Usuario, 10);
      usuario.rol_Usuario = rol;
  
      const savedUser = await this.usersRepository.save(usuario);
  
      const estudiante = new Estudiante();
      estudiante.usuario = savedUser;
      estudiante.nombre_Estudiante = nombre_Usuario;
      estudiante.apellido1_Estudiante = apellido1_Usuario;
      estudiante.apellido2_Estudiante = apellido2_Usuario;
      estudiante.grado = await this.GradoRepository.findOne({ where: { id_grado: createEstudianteDto.gradoId } });
      estudiante.seccion = await this.seccionRepository.findOne({ where: { id_Seccion: createEstudianteDto.seccionId } });
      const savedEstudiante = await this.EstudianteRepository.save(estudiante);
      console.log('Estudiante creado con ID:', savedEstudiante.id_Estudiante);
      console.log('Profesor creado con ID:', savedEstudiante.id_Estudiante); // Verificar que se haya creado correctamente
      console.log('Profesor guardado:', savedEstudiante);

      if (!estudiante.grado || !estudiante.seccion) {
        throw new Error('Grado o sección no encontrados');
      }
  
  
      return { usuario: savedUser, estudiante: savedEstudiante };
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      throw new Error('No se pudo crear el estudiante');
    }
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
    return this.usersRepository.findOne({ where: { email_Usuario: email }, relations: ['rol_Usuario', 'estudiante', 'profesor',] });
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

  async deleteUser(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id_usuario: userId } });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    await this.usersRepository.remove(user); // Esto debería desencadenar la eliminación en cascada
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
