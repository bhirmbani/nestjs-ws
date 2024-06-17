FROM node:buster-slim

WORKDIR /home/app

RUN npm install -g pnpm

COPY src /home/app/src
COPY tsconfig.json /home/app/
COPY package.json /home/app/
COPY views /home/app/views

WORKDIR /home/app/views

RUN pnpm run build

WORKDIR /home/app

RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "start"]
