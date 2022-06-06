import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { LoginUsuarioDto } from './dto/login.dto';
import { NuevoUsuarioArtDto } from './dto/nuevo-usuarioArt.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(RolEntity)
    private readonly rolRepository: RolRepository,
    @InjectRepository(UsuarioEntity)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 
   * @returns 
   */
  async getAll(): Promise<UsuarioEntity[]> {
    const list = await this.authRepository.find();
    //compruebo que la lista no esté vacía
    if (!list.length) {
      throw new NotFoundException(new MessageDto('No hay ningún usuario'))
    }
    return list;
  }

  /**
 * 
 * @param dto 
 * @returns 
 */
  async create(dto: NuevoUsuarioArtDto): Promise<any> {
    const { user, email } = dto;
    const exists = await this.authRepository.findOne({ where: [{ user: user }, { email: email }] });
    if (exists) throw new BadRequestException(new MessageDto('Ese usuario ya existe'));
    //  const rolEmp = await this.rolRepository.findOne({where: {rolNombre: RolNombre.EMPRESARIO}});
    const rolArt = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.ARTISTA } });

    if (!rolArt) throw new InternalServerErrorException(new MessageDto('Los roles no han sido creados'));
    const art = this.authRepository.create(dto);
    art.roles = [rolArt];
    await this.authRepository.save(art);
    return new MessageDto('Artista creado')
  }

  async login(dt: LoginUsuarioDto): Promise<any> {
    const { user } = dt;
    // de esta forma te puedes loguear tanto con el nombre de usuario o el email del usuario
    const usuario = await this.authRepository.findOne({ where: [{ user: user }, { email: user }] });
    if (!usuario) return new UnauthorizedException(new MessageDto('No existe el usuario'));

    const contraseniaOK = await compare(dt.contrasenia, usuario.contrasenia)
    if (!contraseniaOK) return new UnauthorizedException(new MessageDto('Contraseña incorrecta'));
    const payload: PayloadInterface = {
      id: usuario.id,
      user: usuario.user,
      email: usuario.email,
      contrasenia: usuario.contrasenia,
      roles: usuario.roles.map(rol => rol.rolNombre as RolNombre)
    }

    const token = await this.jwtService.sign(payload);
    return { token };

  }


  async refresh(dto: TokenDto): Promise<any> {

    const usuario = await this.jwtService.decode(dto.token);
    const payload: PayloadInterface = {
      id: usuario[`id`],
      user:  usuario[`user`],
      email:  usuario[`email`],
      contrasenia:  usuario[`contrasenia`],
      roles: usuario[`roles`]
    }

    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
