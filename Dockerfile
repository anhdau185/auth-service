FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build

CMD ["./wait-for-it.sh", "db:5432", "--timeout=90", "--strict", "--", "yarn", "start:prod"]
