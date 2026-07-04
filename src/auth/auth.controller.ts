import { Controller,HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autenticar usuário', description: 'Gera um token JWT para o usuário' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}
