import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";



@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
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
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }


}