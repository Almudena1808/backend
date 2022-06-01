import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rol' })
export class RolEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type:'varchar', length:30, nullable:false, unique: true})
  rolNombre: string;
  @ManyToMany(type=> UsuarioEntity, usuario =>usuario.roles)
  usuarios: UsuarioEntity[];
}

