FROM node:alpine as back
WORKDIR /back

COPY /backend/*.json .
COPY /backend/*.lock .
RUN yarn

COPY .env .
COPY /backend/src .
RUN yarn build

FROM node:alpine as front
WORKDIR /front

COPY /frontend/*.json ./
COPY /frontend/*.lock ./
RUN yarn

COPY .env .
COPY /frontend .
RUN yarn build

FROM node:alpine
WORKDIR /app

COPY .env .
COPY /backend/*.json ./
COPY /backend/*.lock ./
RUN yarn

COPY --from=back /back/dist ./dist
COPY --from=front /front/build ./web

EXPOSE 8080

CMD ["node", "dist/main"]