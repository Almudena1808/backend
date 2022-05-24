import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'artista' })
export class ArtistaEntity{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type:'text'})
  descripcion: string;
  @Column({type:'date'})
  fechNac: Date;
  @Column({type:'varchar', length:50})
  especializacion: string;

  @OneToOne(()=>UsuarioEntity)
  @JoinColumn()
  usuario: UsuarioEntity;
}
