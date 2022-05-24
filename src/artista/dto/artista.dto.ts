import { NotBlack } from "src/decorators/notblack.decorator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class ArtistaDto{

    id?:number;

    @NotBlack({message: 'Su descripción no puede estar vacía'})
    descripcion?: string;

    @NotBlack({message: 'Escriba su fecha de nacimiento'})
    fechNac?: Date;

    @NotBlack({message: 'Escriba su especialización'})
    especializacion?: string;

    usuario?: UsuarioEntity;

}