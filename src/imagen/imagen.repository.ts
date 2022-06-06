import { EntityRepository, Repository } from "typeorm";
import { ImagenEntity } from "./imagen.entity";

@EntityRepository(ImagenRepository)
export class ImagenRepository extends Repository<ImagenEntity>{}