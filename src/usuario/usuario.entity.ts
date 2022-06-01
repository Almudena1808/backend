import { hash } from "bcryptjs";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type:'varchar', length:30, nullable:false, unique: true})
  user: string;
  @Column({type:'varchar', nullable:false, length:30})
  nombre: string;
  @Column({type:'varchar', nullable:false, length:150})
  apellidos: string;
  @Column({type:'varchar'})
  contrasenia: string; 
  @Column({type:'varchar' ,length:11})
  telefono: string;
  @Column({type:'varchar', length:150, nullable:false, unique: true})
  email: string;
  @Column({type:'varchar', length:150})
  direccion: string;
  @Column({type:'text', nullable:false})
  foto: string;

  @ManyToMany(type=> RolEntity, rol =>rol.usuarios,{eager:true})
  @JoinTable({
    name:'usuario_rol',
      joinColumn: {name:'usuario_id'},
      inverseJoinColumn:{name:'rol_id'}
})
  roles:RolEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    if(!this.contrasenia)return;
    this.contrasenia = await hash(this.contrasenia, 10);
  }
}
