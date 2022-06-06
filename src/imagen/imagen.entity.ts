import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'imagen'})
export class ImagenEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'longtext'})
    nombre: string;
   

    @ManyToOne(type=> EspectaculoEntity, (espectaculo)=>espectaculo.imagenes)
    @JoinColumn({name: 'espectaculoId'})
    espectaculo: EspectaculoEntity;
} 