import { Injectable } from '@nestjs/common';

@Injectable()
export class AsistenciaService {

   getAllasistencia() {
    return ['Asistencia-1' , 'Asistencia-2', 'Asistencia-3']
   } 

   createasistencia(){
    return 'Crea una asistencia '
   }
   
   updateasistencia(){
    return 'Actualiza la asistencia '
   }

   deteleasistecia() {
    return 'Elimina la asistencia '
   }

}


