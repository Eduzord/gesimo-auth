import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const adapter = new PrismaMariaDb({
      host: configService.get<string>('DB_HOST'), // Host do banco de dados
      port: configService.get<number>('DB_PORT'), // Porta do banco de dados
      user: configService.get<string>('DB_USER'), // Usuário do banco de dados
      password: configService.get<string>('DB_PASSWORD'), // Senha do banco de dados
      database: configService.get<string>('DB_NAME'), // O banco que você criou no XAMPP para a API de auth
    });
    
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}