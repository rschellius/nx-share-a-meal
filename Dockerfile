# 
# https://medium.com/swlh/nx-nestjs-react-docker-deploys-928a55fc19fd
# 
# This image must be built at first. It is tagged so the other Dockerfiles can find it.
# docker build . -t my-base-image:nx-base
# 
FROM node:16-alpine as builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
RUN npm i