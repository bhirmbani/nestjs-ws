FROM node:alpine

ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/app

COPY views /home/app/

WORKDIR /home/app/views

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm run build

