import { EntityRepository, Repository } from "typeorm";
import { EmpresarioEntity } from "./empresario.entity"; 

@EntityRepository(EmpresarioRepository)
export class EmpresarioRepository extends Repository<EmpresarioEntity>{}