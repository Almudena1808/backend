import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistaEntity } from './artista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistaEntity])],
  providers: [ArtistaService],
  controllers: [ArtistaController]
})
export class ArtistaModule {}
