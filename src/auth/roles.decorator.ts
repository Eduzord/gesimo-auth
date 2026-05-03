import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';


// Criando as constantes para usar no decorator e no guard, para evitar erros de digitação

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);