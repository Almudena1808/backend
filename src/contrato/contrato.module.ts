import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoController } from './contrato.controller';
import { ContratoEntity } from './contrato.entity';
import { ContratoService } from './contrato.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoEntity])],
  providers: [ContratoService],
  controllers: [ContratoController]
})
export class ContratoModule {}
