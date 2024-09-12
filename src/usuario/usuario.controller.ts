import { Controller, Get, Post, Put,Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('/usuario')
export class UsuarioController {
constructor(private usuarioServise: UsuarioService){}

@Get()
getAllusuario(){
    return this.usuarioServise.getAllusuario();
}



@Post()
createusuario(){
    return this.usuarioServise.createusuario();
}


@Put()
updateusuario(){
    return this.usuarioServise.updateusurio();
}
@Delete()
deleteusuario(){
    return this.usuarioServise.deleteusuario();
}

}
