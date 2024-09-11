import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';

@Controller('/asistencia')
export class AsistenciaController {
    constructor(private asistenciaService: AsistenciaService ) {}

    @Get()
    getAllasistencia(){
        return this.asistenciaService.getAllasistencia();
    }

    @Post()
    createasistencia(){
        return this.asistenciaService.createasistencia() ;
    }

    @Put()
    updateasistencia(){
        return this.asistenciaService.updateasistencia();
    }
    
    @Delete()
    deleasistencia(){
return this.asistenciaService.deteleasistecia();
    }

}
