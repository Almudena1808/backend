import { NotBlack } from "src/decorators/notblack.decorator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class EmpresarioDto{

    id?:number;

    @NotBlack({message: 'No puede dejar el nombre de la organización vacía'})
    organizacion?: string;

    usuario?: UsuarioEntity;

}