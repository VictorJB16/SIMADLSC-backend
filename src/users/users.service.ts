import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Materia } from 'src/materia/entities/materia.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';

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

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      const {
        nombre_Usuario,
        apellido1_Usuario,
        apellido2_Usuario,
        email_Usuario,
        contraseña_Usuario,
        rol_Usuario,
        id_Materia = [],
      } = createUserDto;

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
      console.log('✅ Usuario creado con ID:', savedUser.id_usuario);

      if (rol_Usuario === 3) {
        const materias = await Promise.all(
          (id_Materia || []).map(async (id) => {
            const materia = await this.materiaRepository.findOne({ where: { id_Materia: id } });
            if (!materia) {
              throw new NotFoundException(`Materia con ID ${id} no encontrada`);
            }
            return materia;
          }),
        );

        const profesor = new Profesor();
        profesor.usuario = savedUser;
        profesor.nombre_Profesor = nombre_Usuario;
        profesor.apellido1_Profesor = apellido1_Usuario;
        profesor.apellido2_Profesor = apellido2_Usuario;
        profesor.id_Materia = materias;

        const savedProfesor = await this.ProfesorRepository.save(profesor);
        console.log('✅ Profesor creado con ID:', savedProfesor.id_Profesor);
        console.log('Materias asignadas:', materias.map((m) => m.nombre_Materia));
      }

      return savedUser;
    } catch (error) {
      console.error('❌ Error al crear el usuario:', error.message || error);
      throw new Error('No se pudo crear el usuario');
    }
  }

  async createUserAsStudent(
    createUserDto: CreateUserDto,
    createEstudianteDto: CreateEstudianteDto
  ): Promise<{ usuario: Usuario; estudiante: Estudiante }> {
    try {
      const {
        nombre_Usuario,
        apellido1_Usuario,
        apellido2_Usuario,
        email_Usuario,
        contraseña_Usuario,
        rol_Usuario,
      } = createUserDto;

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

      if (!estudiante.grado || !estudiante.seccion) {
        throw new Error('Grado o sección no encontrados');
      }

      const savedEstudiante = await this.EstudianteRepository.save(estudiante);
      console.log('Estudiante creado con ID:', savedEstudiante.id_Estudiante);

      return { usuario: savedUser, estudiante: savedEstudiante };
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      throw new Error('No se pudo crear el estudiante');
    }
  }

  async findById(id: number): Promise<Usuario> {
    const user = await this.usersRepository.findOne({
      where: { id_usuario: id },
      relations: ['rol_Usuario', 'estudiante', 'profesor'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usersRepository.find({ relations: ['rol_Usuario'] });
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.usersRepository.findOne({
      where: { email_Usuario: email },
      relations: ['rol_Usuario', 'estudiante', 'profesor'],
    });
  }

  async findUserByEmail(email: string): Promise<Usuario | undefined> {
    return this.usersRepository.findOne({
      where: { email_Usuario: email },
      relations: ['rol_Usuario', 'estudiante', 'profesor'],
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Usuario> {
    const user = await this.findById(id);

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

    await this.usersRepository.remove(user);
  }

  async toggleBlockUser(id: number, bloqueado_Usuario: boolean): Promise<Usuario> {
    const user = await this.findById(id);
    user.bloqueado_Usuario = bloqueado_Usuario;
    return this.usersRepository.save(user);
  }

  async updatePassword(id_usuario: number, hashedPassword: string): Promise<void> {
    try {
      console.log('Actualizando contraseña para el usuario:', id_usuario);

      const resultado = await this.usersRepository.update(
        { id_usuario },
        { contraseña_Usuario: hashedPassword },
      );

      if (resultado.affected === 0) {
        throw new Error('No se actualizó ningún registro. Verifica que el ID del usuario es correcto.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw new InternalServerErrorException('Error al actualizar la contraseña');
    }
  }

  async createUserForExistingStudent(
    createUserDto: CreateUserDto,
    student: Estudiante
  ): Promise<{ usuario: Usuario; estudiante: Estudiante }> {
    try {
      const {
        nombre_Usuario,
        apellido1_Usuario,
        apellido2_Usuario,
        email_Usuario,
        contraseña_Usuario,
        rol_Usuario,
      } = createUserDto;

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

      student.usuario = savedUser;
      const updatedStudent = await this.EstudianteRepository.save(student);

      return { usuario: savedUser, estudiante: updatedStudent };
    } catch (error) {
      console.error('Error al crear usuario para estudiante existente:', error);
      throw new Error('No se pudo crear el usuario para el estudiante');
    }
  }
}
