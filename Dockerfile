FROM node:18.12.1-alpine

WORKDIR /backend

COPY . .

RUN npm install --force


EXPOSE 9000

# CMD ["npx", "sequelize-cli", "db:migrate"]

# CMD ["npx", "sequelize-cli", "db:seed:all"]

# CMD ["npm", "start"]