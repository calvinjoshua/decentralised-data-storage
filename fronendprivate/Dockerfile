FROM node:16.14-buster as build 

WORKDIR /code

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

#nginx 

FROM nginx:1.21-alpine as prod

COPY --from=build /code/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]