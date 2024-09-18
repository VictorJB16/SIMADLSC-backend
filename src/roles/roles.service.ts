import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  // Crear un nuevo rol
  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const newRole = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(newRole);
  }

  // Obtener todos los roles
  async findAll(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  // Obtener un rol por ID
  async findOne(id: number): Promise<Roles> {
    const role = await this.rolesRepository.findOne({ where: { id_Rol: id } });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return role;
  }

  // Actualizar un rol por ID
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return this.rolesRepository.save(role);
  }

  // Eliminar un rol por ID
  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.rolesRepository.remove(role);
  }
}
