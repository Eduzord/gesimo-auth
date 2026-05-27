import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuariosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UsuarioCreateInput) {
    return this.prisma.usuario.create({ data });
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      include: { role: true } // Já traz qual é a role do usuário
    });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: { role: true }
    });
  }

  // BÔNUS: Já estou deixando esse método pronto para usarmos no Login (Auth)
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
      include: { role: true }
    });
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.usuario.update({
      where: { id },
      data: { status: 0 },
    });
  }
  async removePerm(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}