import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'empresario' })
export class EmpresarioEntity{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type:'varchar', length:100})
  organizacion: string;

  @OneToOne(()=>UsuarioEntity)
  @JoinColumn()
  usuario: UsuarioEntity;
}