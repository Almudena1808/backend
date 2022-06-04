import { ArtistaEntity } from "src/artista/artista.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'espectaculo'})
export class EspectaculoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar', length:50, unique: true})
    nombre: string;
    @Column({type:'text'})
    descripcion: string;
    @Column({type:'varchar', length:8})
    precio: string;

    @OneToOne(type=> UsuarioEntity)
    @JoinColumn()
    artista: UsuarioEntity;
} 