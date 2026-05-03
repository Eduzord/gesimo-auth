import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core/services/reflector.service";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        // Lê quais roles a rota exige, usando o Reflector para ler os metadados definidos pelo decorator @Roles
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        // Se a rota não tem o decorator @Roles, ela é pública, então pode ser acessada
        if (!requiredRoles) {
            return true;
        }

        // Pega o usuário extraído do Token pelo JwtStrategy (que já tem a role do usuário, graças ao include no findByEmail)
        const { user } = context.switchToHttp().getRequest();

        // Verifica se a role do usuário está entre as roles exigidas pela rota
        const hasRole = requiredRoles.some((role) => user.role === role);

        if (!hasRole) {
            throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
        }

        return true;


}

}