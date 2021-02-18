FROM node:alpine

WORKDIR /app

ADD yarn.lock /app
ADD *.json /app

RUN yarn

ADD src /app
ADD .env /app

RUN yarn build

EXPOSE 3333

CMD ["yarn", "start"]