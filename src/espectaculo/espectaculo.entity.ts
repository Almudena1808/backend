import { ContratoEntity } from "src/contrato/contrato.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'espectaculo' })
export class EspectaculoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 50, unique: true })
    nombre: string;
    @Column({ type: 'text' })
    descripcion: string;
    @Column({ type: 'varchar', length: 8 })
    precio: string;

    @Column({ type: 'longtext', nullable: false })
    imagen: string;

    @ManyToOne(type => UsuarioEntity, (usuario) => usuario.espectaculos)
    @JoinColumn({ name: 'usuarioId' })
    usuario: UsuarioEntity;

    @OneToMany(() => ContratoEntity, (contrato) => contrato.espectaculo)
    contratos: ContratoEntity[];


} 