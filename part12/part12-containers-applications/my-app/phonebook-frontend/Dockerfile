FROM node:16 AS base

ARG REACT_APP_API_URL
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build --prod
RUN npm install -g serve

CMD ["serve", "build"]