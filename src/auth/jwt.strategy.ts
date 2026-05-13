import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsuariosService } from "../usuarios/usuarios.service";
import { UnauthorizedException } from "@nestjs/common";


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private usuariosService: UsuariosService) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET must be defined');
        }

        super({
            // Ensina a procurar o token no header da requisição, seguindo o padrão "Bearer <token>"
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // O token expirado não é aceito
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        const usuarioBanco = await this.usuariosService.findOne(payload.sub);

    if (!usuarioBanco) {
      throw new UnauthorizedException('Token inválido: Usuário não existe mais no sistema.');
    }

    // Retorna os dados frescos diretamente do banco, ignorando a role velha que estava no token
    return { 
      userId: usuarioBanco.id, 
      email: usuarioBanco.email, 
      // Pegamos a role fresquinha do banco:
      role: usuarioBanco.role?.role 
    };
    }


}