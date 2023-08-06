FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build --prod
RUN npm install -g serve

CMD ["serve", "build"]