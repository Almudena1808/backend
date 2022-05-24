import { ArtistaEntity } from "src/artista/artista.entity";
import { NotBlack } from "src/decorators/notblack.decorator";

export class EspectaculoDto{

    id?:number;

    @NotBlack({message: 'No puede dejar el nombre del espactáculo vacío'})
    nombre?: string;

    @NotBlack({message: 'Su descripción no puede estar vacía'})
    descripcion?: string;

    @NotBlack({message: 'Escriba el precio del espectáculo'})
    precio?: number;

    artista?: ArtistaEntity;

}