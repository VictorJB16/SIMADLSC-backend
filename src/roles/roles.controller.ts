import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Crear un nuevo rol
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  // Obtener todos los roles
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  // Obtener un rol por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  // Actualizar un rol por ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  // Eliminar un rol por ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}
