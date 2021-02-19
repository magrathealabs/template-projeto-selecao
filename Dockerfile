FROM node:alpine as back
WORKDIR /back

RUN echo ${PORT}

COPY /backend/*.json ./
COPY /backend/*.lock ./
RUN yarn

COPY /backend/src .
RUN yarn build

FROM node:alpine as front
WORKDIR /front

COPY /frontend/*.json ./
COPY /frontend/*.lock ./
RUN yarn

COPY /frontend .
RUN yarn build

FROM node:alpine
WORKDIR /app

COPY /backend/*.json ./
COPY /backend/*.lock ./
RUN yarn

COPY --from=back /back/dist ./dist
COPY --from=front /front/build ./web

CMD ["node", "dist/main"]