import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class ContratoDto{

    id?:number;
    aceptado?: boolean;
    fechaEvento?: string;
    fechaFirma?: string;
    espectaculo?: EspectaculoEntity;
    empresario?: UsuarioEntity;


}