import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';
import { Usuario } from './entities/user.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { BlockGuard } from 'src/auth/guard/block.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
 // Ruta para registrar un nuevo usuario (general)
 @Post('register')
 async createUser(@Body() createUserDto: CreateUserDto) {
   return this.usersService.createUser(createUserDto);
 }


 @Post('register-student')
async createUserAsStudent(
  @Body() { createUserDto, createEstudianteDto }: { createUserDto: CreateUserDto, createEstudianteDto: CreateEstudianteDto }
): Promise<{ usuario: Usuario, estudiante: Estudiante }> {
  return this.usersService.createUserAsStudent(createUserDto, createEstudianteDto);
}
 



  // Ruta para obtener un usuario por ID (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  // Ruta para obtener todos los usuarios (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Ruta para actualizar un usuario por ID (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // Ruta para eliminar un usuario por ID (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado' }; // O devuelve un estado 204 si no quieres enviar ningún mensaje.
  }

  @UseGuards(JwtAuthGuard, BlockGuard)  // opcional, para que solo usuarios válidos/administradores lleguen aquí
  @Put(':id/block')
  async blockUser(@Param('id') id: number) {
    const updated = await this.usersService.toggleBlockUser(id);
    return {
      message: `Usuario ${updated.bloqueado_Usuario ? 'bloqueado' : 'desbloqueado'}`,
      user: updated,
    };
  }
}
