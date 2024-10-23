// import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
// import { Matricula } from './entities/matricula.entity';
// //import { UpdateMatriculaDto } from './dto/update-matricula.dto';
// import { MatriculaService } from './matricula.service';
// import { CreateMatriculaDto } from './dto/create-matricula.dto';
// import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
// import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';

// @Controller('matriculas')
// export class MatriculaController {

//   constructor(private readonly matriculaService: MatriculaService) {}

//    // Endpoint para crear una matrícula
//   @Post()
//   @UsePipes(new ValidationPipe({ 
//     whitelist: true, 
//     forbidNonWhitelisted: true, 
//     transform: true // Transforma automáticamente los tipos de datos
//   }))
//   async create(@Body() createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
//     return this.matriculaService.create(createMatriculaDto);
//   }

//   // Endpoint para obtener todas las matrículas
//   @Get()
//   async findAll(): Promise<Matricula[]> {
//     return this.matriculaService.findAll();
//   }

//   // Endpoint para obtener una matrícula por ID
//   @Get(':id')
//   async findOne(@Param('id', ParseIntPipe) id: number): Promise<Matricula> {
//     return this.matriculaService.findOne(id);
//   }

//   // Endpoint opcional para obtener datos necesarios para crear una matrícula
//   @Get('datos/:id_Estudiante')
//   async getDatosParaCrearMatricula(
//     @Param('id_Estudiante', ParseIntPipe) id_Estudiante: number,
//   ): Promise<{ estudiante: Estudiante; encargadoLegal: EncargadoLegal }> {
//     return this.matriculaService.getDatosParaCrearMatricula(id_Estudiante);
//   }
//   }