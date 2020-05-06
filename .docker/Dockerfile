FROM node:12 as dev

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN node_modules/.bin/ng build --prod && node_modules/.bin/ng run app:server:production


FROM nginx as prod

WORKDIR /usr/share/nginx/html
COPY .docker/d8b.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /usr/src/app/www/ /usr/share/nginx/html
EXPOSE 80

FROM node:12 as ssr
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app/dist/ /usr/src/app
COPY --from=dev /usr/src/app/www/ /usr/src/app/www
EXPOSE 4000

CMD ["node", "app-server/main.js"]
