import { EntityRepository, Repository } from "typeorm";
import { ArtistaEntity } from "./artista.entity";

@EntityRepository(ArtistaRepository)
export class ArtistaRepository extends Repository<ArtistaEntity>{}