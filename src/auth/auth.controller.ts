import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login.dto';
import { NuevoUsuarioArtDto } from './dto/nuevo-usuarioArt.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get()
    async getAll() {
        return await this.authService.getAll();
    }

  
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('nuevo')
     create(@Body() dto:NuevoUsuarioArtDto){
        return  this.authService.create(dto);
    }
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login')
     login(@Body() dto:LoginUsuarioDto){
        return  this.authService.login(dto);
    }
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('refresh')
     refresh(@Body() dto:TokenDto){
        return  this.authService.refresh(dto);
    }
}
