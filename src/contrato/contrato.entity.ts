import { EmpresarioEntity } from "src/empresario/empresario.entity";
import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contrato' })
export class ContratoEntity{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type:'tinyint'})
  aceptado: boolean;

  @OneToOne(()=>EspectaculoEntity)
  @JoinColumn()
  espectaculo: EspectaculoEntity;

  @OneToOne(()=>EmpresarioEntity)
  @JoinColumn()
  empresario: EmpresarioEntity;
}