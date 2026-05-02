import { Role } from '../../roles/entities/role.entity';

export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  senha_hash!: string;
  status!: number;
  id_role!: number;
  
  // Relacionamento (opcional nas buscas)
  role?: Role;
}