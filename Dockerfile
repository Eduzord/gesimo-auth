# Define a versão específica do Node.js
FROM node:24.13.0-alpine

# O Prisma requer o OpenSSL para rodar no Alpine Linux
RUN apk add --no-cache openssl

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de gerenciamento de pacotes primeiro
# Isso otimiza o cache do Docker, evitando reinstalar pacotes se o código mudar, mas as dependências não
COPY package.json package-lock.json ./

# Instala as dependências via npm
RUN npm install

# Copia o schema do Prisma e o arquivo de configuração
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Adicione esta linha para satisfazer a validação do prisma.config.ts durante o build
# (Ajustado para mysql para refletir o seu banco real)
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"

# Gera o Prisma Client
RUN npx prisma generate

# Copia todo o restante do código fonte do projeto
COPY . .

# ---------------------------------------------------
# PASSO DE PRODUÇÃO 1: Compilar o código TypeScript
# Isso vai gerar a pasta 'dist' contendo o JavaScript otimizado
# ---------------------------------------------------
RUN npm run build

# Define as variáveis de ambiente (podem ser sobrescritas via docker-compose ou runtime)

# Expõe a porta definida para a API
EXPOSE 3000

# ---------------------------------------------------
# PASSO DE PRODUÇÃO 2: Rodar o JavaScript puro
# Mais rápido, mais seguro e consome menos memória RAM
# ---------------------------------------------------
CMD ["node", "dist/main"]