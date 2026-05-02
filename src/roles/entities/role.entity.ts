import { Usuario } from '../../usuarios/entities/usuario.entity';

export class Role {
    id!: number;
    nome!: string;

    usuarios?: Usuario[]; // Relacionamento opcional para facilitar buscas
}
