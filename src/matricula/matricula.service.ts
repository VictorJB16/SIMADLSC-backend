import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Matricula } from './Entities/matricula-entity';
import { Repository } from 'typeorm'; 
import {CreateMatriculaDT} from './Dto/create-matricula.dto'
import { UpdateMatriculaDT } from './Dto/update-matricula.dto';
 
@Injectable()
export class MatriculaService {

    constructor(@InjectRepository(Matricula) private matriculaRepository:Repository<Matricula>) {}

    creatematricula(Matricula:CreateMatriculaDT){
const newmatricula=this.matriculaRepository.create(Matricula)
return this.matriculaRepository.save(newmatricula)
    }

getmatricula(){
  return  this.matriculaRepository.find()
}

getmatriculas(id_Matricula:number){
 return this.matriculaRepository.findOne({
    where:{
id_Matricula,
    },
})
}

deletematricula(id_Matricula:number){
return this.matriculaRepository.delete({id_Matricula})
}

updatematricula(id_Matricula:number, matricula:UpdateMatriculaDT)
{
   return this.matriculaRepository.update({id_Matricula},matricula)
}
}
