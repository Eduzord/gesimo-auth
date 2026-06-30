import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async verificarSaude() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'UP',
        servico: 'api-auth',
        database: 'UP',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'DOWN',
        servico: 'api-auth',
        database: 'DOWN',
        timestamp: new Date().toISOString(),
      });
    }
  }
}