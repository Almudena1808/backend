import { ArtistaEntity } from "src/artista/artista.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'espectaculo'})
export class EspectaculoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar', length:50})
    nombre: string;
    @Column({type:'text'})
    descripcion: string;
    @Column({type:'double'})
    precio: number;


    @OneToOne(()=>ArtistaEntity)
    @JoinColumn()
    artista: ArtistaEntity;
} 