import { Controller, Post, Body, Get,Param,ParseIntPipe, Delete, Patch} from '@nestjs/common';
import { CreateMatriculaDT } from './Dto/create-matricula.dto';
import { MatriculaService } from './matricula.service';


@Controller('matricula')
export class MatriculaController {

constructor(private MatriculaService:MatriculaService)
{}
@Get()
getmatricula(){
    return this.MatriculaService.getmatricula();
}
@Get(':id_matricula')
getmatriculas(@Param('id_matricula',ParseIntPipe)id_Matricula:number){
    return this.MatriculaService.getmatriculas(id_Matricula);
}

    @Post()
    createMatricula(@Body()newMatricula:CreateMatriculaDT){
        return this.MatriculaService.creatematricula(newMatricula)

    }
@Delete(':id_matricula')
deletematricula(@Param('id_matricula', ParseIntPipe)id_Matricula:number){
 return  this.MatriculaService.deletematricula(id_Matricula)
}
@Patch(':id_m')
updatematricula(){}

}
