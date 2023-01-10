FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache bash
RUN yarn global add @nestjs/cli

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --prod --frozen-lockfile

COPY . .

RUN yarn build

CMD ["./wait-for-it.sh", "db:5432", "--timeout=30", "--strict", "--", "yarn", "start:prod"]
