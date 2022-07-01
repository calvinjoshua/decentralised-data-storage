FROM node:17-alpine3.14 as build 

WORKDIR /code

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

CMD node server1
