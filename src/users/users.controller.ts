import { Controller, Post, Body, Get, Param, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Usuario } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auths/jwt-auths.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Ruta para obtener un usuario por ID (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  // Ruta para actualizar un usuario (protegida con JWT)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<Usuario>) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
