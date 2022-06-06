import { NotBlack } from "src/decorators/notblack.decorator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class EspectaculoDto{

    id?:number;

    @NotBlack({message: 'No puede dejar el nombre del espactáculo vacío'})
    nombre?: string;

    @NotBlack({message: 'Su descripción no puede estar vacía'})
    descripcion?: string;

    @NotBlack({message: 'Escriba el precio del espectáculo cantidad máxima de 99999,99€'})
    precio?: string;

    usuario?: UsuarioEntity;

}