import { EntityRepository, Repository } from "typeorm";
import { EspectaculoEntity } from "./espectaculo.entity";

@EntityRepository(EspectaculoRepository)
export class EspectaculoRepository extends Repository<EspectaculoEntity>{}