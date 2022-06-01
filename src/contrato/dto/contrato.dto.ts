import { NotBlack } from "src/decorators/notblack.decorator";
import { EmpresarioEntity } from "src/empresario/empresario.entity";
import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";

export class ContratoDto{

    id?:number;
    aceptado?: boolean;
    fechaEvento?: Date;
    fechaFirma?: Date;
    espectaculo?: EspectaculoEntity;
    empresario?: EmpresarioEntity;


}