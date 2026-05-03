import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
) {}

async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(loginDto.email);

    if (!usuario) {
        throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, usuario.senha_hash);

    if (!senhaValida) {
        throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = { sub: usuario.id, email: usuario.email, role_id: usuario.id_role };

    return {
        access_token: this.jwtService.sign(payload),
    };

}

}
