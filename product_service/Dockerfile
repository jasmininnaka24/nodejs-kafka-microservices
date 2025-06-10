FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript and generate Prisma Client into node_modules
RUN npm run build

EXPOSE 8000

CMD ["node", "dist/src/server.js"]
