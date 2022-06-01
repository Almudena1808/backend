import { EmpresarioEntity } from "src/empresario/empresario.entity";
import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contrato' })
export class ContratoEntity{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type:'tinyint'})
  aceptado: boolean;

  @Column({type: Date})
  fechaEvento: Date;

  @Column ({type: Date})
  fechaFirma: Date;

  @OneToOne(()=>EspectaculoEntity, espectaculo => espectaculo.id,{
    cascade: true
  })
  @JoinColumn()
  espectaculo: EspectaculoEntity;

  @OneToOne(()=>EmpresarioEntity, empresario => empresario.id,{
    cascade: true
  })
  @JoinColumn()
  empresario: EmpresarioEntity;
}