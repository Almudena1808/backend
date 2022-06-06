import { NotBlack } from "src/decorators/notblack.decorator";
import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";

export class ImagenDto{

    id?:number;

    @NotBlack({message: 'No puede dejar el archivo vacío'})
    nombre?: string;


    espectaculo?: EspectaculoEntity;

}