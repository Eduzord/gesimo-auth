# GesImo - Auth API (Autenticação)

A **Auth API** é o microsserviço isolado do GesImo encarregado estritamente do gerenciamento de contas, segurança das credenciais e autorização de acesso ao sistema. Ao separar o domínio de Autenticação dos demais serviços, garantimos um controle rigoroso sobre os dados sensíveis dos usuários.

## 🚀 Funcionalidades
- **Gestão de Usuários:** CRUD completo de contas de usuários (Corretores, Administradores, etc).
- **Criptografia Forte:** Hasheamento de senhas utilizando `bcrypt` para não armazenar credenciais em texto puro.
- **Autorização (Role-based):** Gerenciamento de Cargos e Regras de acesso (Roles). Rotas são protegidas e segregadas conforme a permissão de cada cargo.
- **Login & JWT:** Geração de Tokens de Acesso Seguros (JSON Web Tokens). O token gerado por esta API é reconhecido pelo Gateway e utilizado para dar acesso ao resto do sistema.
- **Soft Delete:** Capacidade de inativar usuários (`status = 0`) para bloquear imediatamente novos acessos no Gateway sem perder o histórico do usuário no banco relacional.

## 🛠 Stacks Utilizadas
- **[NestJS](https://nestjs.com/)**: Framework estrutural focado em código limpo, arquitetura e Injeção de Dependências.
- **[Prisma ORM](https://www.prisma.io/)**: ORM Next-generation usado para modelar o schema (tabelas `Usuario` e `Roles`), gerenciar migrações de banco e fornecer queries tipadas com TypeScript.
- **MySQL**: Banco de dados relacional dedicado para armazenamento de usuários e regras de acesso.
- **bcrypt & JSON Web Token (JWT)**: Bibliotecas utilizadas para hasheamento e geração de tokens.
- **class-validator / class-transformer**: Utilizados nos DTOs (Data Transfer Objects) para garantir que toda requisição de entrada seja validada antes de acessar as regras de negócio.

## ⚙️ Instruções para Rodar Localmente

1. Certifique-se de ter o **Node.js** instalado na sua máquina.
2. Navegue até a pasta da `auth-api`:
   ```bash
   cd auth-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie ou ajuste o arquivo `.env` com a sua conexão do banco de dados MySQL e sua chave JWT:
   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   JWT_SECRET="sua_chave_secreta_aqui"
   ```
5. Aplique as migrações ou faça o pull do Schema do Prisma:
   ```bash
   npx prisma generate
   # Se for o primeiro setup no banco vazio: npx prisma db push (ou npx prisma migrate dev)
   ```
6. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
7. A Auth API rodará primariamente em `http://localhost:3000`.
