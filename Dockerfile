# Build js
FROM node:alpine AS builder

ADD . /app
ADD .env /app/backend
ADD .env /app/frontend

WORKDIR /app/frontend
RUN yarn
RUN yarn build

WORKDIR /app/backend
RUN yarn 
RUN yarn build

# container
FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=builder /app/backend/dist ./
COPY --from=builder /app/frontend/build ./web

EXPOSE 80

CMD ["nest", "start"]