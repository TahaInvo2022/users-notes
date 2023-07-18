FROM node:18.12.1-alpine

WORKDIR /backend

COPY . .

RUN npm install --force


EXPOSE 9000