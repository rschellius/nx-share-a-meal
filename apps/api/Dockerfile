# 
# https://docs.docker.com/develop/develop-images/multistage-build/
# 
FROM my-base-image:nx-base AS base-image

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

# COPY . .

# build api dist into /app/builder/dist/apps/api 
RUN npx nx build api ${BUILD_FLAG}

# Start a new empty layer and copy only the requires folders onto it. 
# FROM my-base-image:nx-base
FROM node:16-alpine

WORKDIR /app/builder
COPY --from=base-image /app/builder/dist ./dist
COPY --from=base-image /app/builder/node_modules ./node_modules
COPY --from=base-image /app/builder/.env .

ENV NODE_ENV=${NODE_ENV}

CMD ["node", "./dist/apps/api/main.js"]