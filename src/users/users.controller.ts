import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.createUser(createUserDto);
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

  @UseGuards(JwtAuthGuard)
  @Put(':id/block')
  async blockUser(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    // Invertimos el estado actual de "bloqueado_Usuario"
    const updateUserDto: UpdateUserDto = { bloqueado_Usuario: !user.bloqueado_Usuario };
  
    // Guardamos el estado actualizado en la base de datos
    await this.usersService.updateUser(user.id_usuario, updateUserDto);
  
    // Devolvemos el usuario actualizado
    return { message: 'Estado de usuario actualizado', user: { ...user, bloqueado_Usuario: !user.bloqueado_Usuario } };
  }

}
