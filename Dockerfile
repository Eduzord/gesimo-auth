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
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Gera o Prisma Client
RUN npx prisma generate

# Copia todo o restante do código fonte do gateway
COPY . .

# Define as variáveis de ambiente (podem ser sobrescritas via docker-compose ou runtime)


# Expõe a porta definida para o gateway
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento (com hot-reload)
CMD ["npm", "run", "start:dev"]