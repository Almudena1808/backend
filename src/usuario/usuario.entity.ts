import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:30, unique: true})
  user: string;
  @Column({type:'varchar', length:30})
  nombre: string;
  @Column({type:'varchar', length:150})
  apellidos: string;
  @Column({type:'varchar', length:150})
  contrasenia: string; 
  @Column({type:'int'})
  telefono: number;
  @Column({type:'varchar', length:150})
  email: string;
  @Column({type:'varchar', length:150})
  direccion: string;
  @Column({type:'blob'})
  foto: string;
}
