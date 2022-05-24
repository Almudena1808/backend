import { Module } from '@nestjs/common';
import { EmpresarioService } from './empresario.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresarioEntity } from './empresario.entity';
import { EmpresarioController } from './empresario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EmpresarioEntity])],
  providers: [EmpresarioService],
  controllers: [EmpresarioController]
})
export class EmpresarioModule {}