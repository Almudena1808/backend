import { hash } from "bcryptjs";
import { type } from "os";
import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
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
  @Column({type:'longtext', nullable:false})
  foto: string;

  @Column({type:'varchar', length:10, nullable:false})
  fechNac: string;

  @Column({type:'varchar', length:50 , nullable:true})
  especializacion?: string;
  @Column({type:'text', nullable:true})
  descripcion?: string; 
  @Column({type:'varchar', length:50 , nullable:true})
  organizacion?: string;

  @ManyToMany(type=> RolEntity, rol =>rol.usuarios,{eager:true})
  @JoinTable({
    name:'usuario_rol',
      joinColumn: {name:'usuario_id'},
      inverseJoinColumn:{name:'rol_id'}
})
  roles:RolEntity[];


  @OneToMany(type=>EspectaculoEntity, (espectaculo)=>espectaculo.usuario)
  espectaculos: EspectaculoEntity[];


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    if(!this.contrasenia)return;
    this.contrasenia = await hash(this.contrasenia, 10);
  }
}
