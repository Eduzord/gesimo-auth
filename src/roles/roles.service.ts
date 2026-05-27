import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './repository/roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.create(createRoleDto);
  }

  async findAll() {
    return this.rolesRepository.findAll();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role com ID ${id} não encontrada.`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id); // Chama o método acima para garantir que existe
    return this.rolesRepository.update(id, updateRoleDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Garante que existe antes de atualizar
    return this.rolesRepository.remove(id);
  }

  async reinstate(id: number) {
    await this.findOne(id); // Garante que existe antes de atualizar
    return this.rolesRepository.update(id, { status: 1 });
  }

  async removePerm(id: number) {
    await this.findOne(id); // Garante que existe antes de deletar
    return this.rolesRepository.removePerm(id);
  }
}