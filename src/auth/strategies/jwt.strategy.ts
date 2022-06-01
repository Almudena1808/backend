import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { PayloadInterface } from '../payload.interface';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService,

    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface) {
        const { user, email } = payload;
        const usuario = await this.authRepository.findOne({ where: [{ user: user }, { email: email }]});
        if(!usuario) return new UnauthorizedException(new MessageDto('Datos incorrectos'));
        return payload;
    }
}