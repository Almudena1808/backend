import { EspectaculoEntity } from "src/espectaculo/espectaculo.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contrato' })
export class ContratoEntity{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type:'tinyint'})
  aceptado: boolean;

  @Column({type: "varchar"})
  fechaEvento: string  ;
  @Column ({type: "varchar"})
  fechaSolicitud: string;

  @Column ({type: "varchar"})
  fechaFirma: string;



  @ManyToOne(() => EspectaculoEntity, (espectaculo) => espectaculo.contratos,{ onDelete: 'CASCADE' })
  @JoinColumn({name: 'espectaculoId'})
  espectaculo: EspectaculoEntity;
  


  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.contratos)
  @JoinColumn({name: 'empresarioId'})
  empresario: UsuarioEntity;
}