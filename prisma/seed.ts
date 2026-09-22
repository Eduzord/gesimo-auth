import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({ adapter });

const SENHA_PADRAO = '123456';

async function main() {
  const senhaHash = await bcrypt.hash(SENHA_PADRAO, 10);

  const roleAdmin = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: { role: 'ADMIN', status: 1 },
  });

  const roleUser = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { role: 'USER', status: 1 },
  });

  const usuarios = [
    {
      nome: 'Administrador do Sistema',
      email: 'admin@gesimo.com',
      senha_hash: senhaHash,
      status: 1,
      id_role: roleAdmin.id,
    },
    {
      nome: 'Carlos Corretor',
      email: 'corretor@gesimo.com',
      senha_hash: senhaHash,
      status: 1,
      id_role: roleUser.id,
    },
    {
      nome: 'Usuário Inativo Teste',
      email: 'inativo@gesimo.com',
      senha_hash: senhaHash,
      status: 0,
      id_role: roleUser.id,
    },
  ];

  for (const usuario of usuarios) {
    await prisma.usuario.upsert({
      where: { email: usuario.email },
      update: {},
      create: usuario,
    });
  }

  console.log('Seed concluído: auth-api');
  console.log(`Senha padrão de todos os usuários: ${SENHA_PADRAO}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
