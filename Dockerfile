# 
# https://medium.com/swlh/nx-nestjs-react-docker-deploys-928a55fc19fd
# 
# This image must be built at first. It is tagged so the other Dockerfiles can find it.
# docker build . -t my-base-image:nx-base
#
# The image uses node:alpine, which does not have bash installed. If you want to start
# the container in interactive mode, change alpine to node:latest. This is a bigger 
# base image with bash installed.
#
# FROM node:latest as builder
#
# docker run -i -t my-base-image:nx-base /bin/bash 
#
FROM node:16 as base-image

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
RUN npm install