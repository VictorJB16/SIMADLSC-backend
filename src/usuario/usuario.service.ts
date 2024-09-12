import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {

    getAllusuario() {
        return ["Usuario1", "Usuario2", "Usuario3"]
    }

    createusuario(){
        return "Crea un usuario "
    }
    
    updateusurio(){
        return "Actualiza un usuario"
    }

    deleteusuario(){
        return "Eliminar usaurio"
    }
}
