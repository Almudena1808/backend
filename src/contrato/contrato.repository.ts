import { EntityRepository, Repository } from "typeorm";
import { ContratoEntity } from "./contrato.entity";

@EntityRepository(ContratoRepository)
export class ContratoRepository extends Repository<ContratoEntity>{}