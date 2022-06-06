import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config/constants';
import { UsuarioModule } from './usuario/usuario.module';
import { EspectaculoModule } from './espectaculo/espectaculo.module';
import { ContratoModule } from './contrato/contrato.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { ImagenModule } from './imagen/imagen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // si el logging lo pongo a true se crean todas las tablas mediente las entidades y si lo pongo false, no
        logging: false
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    EspectaculoModule,
 //   ContratoModule,
    RolModule,
    AuthModule,
    ImagenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
