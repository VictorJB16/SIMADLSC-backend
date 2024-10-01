import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { HorariosService } from './horario.service';

@Controller('horarios')
export class HorariosController {
  // constructor(private readonly horariosService: HorariosService) {}

  // @Post()
  // create(@Body() createHorarioDto: CreateHorarioDto) {
  //   return this.horariosService.create(createHorarioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.horariosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.horariosService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
  //   return this.horariosService.update(id, updateHorarioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.horariosService.remove(id);
  // }
}
