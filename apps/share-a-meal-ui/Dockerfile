FROM my-base-image:nx-base AS base-image

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build share-a-meal-ui ${BUILD_FLAG}

# Start a new empty layer and copy only the requires folders onto it. 
# FROM my-base-image:nx-base
FROM node:16-alpine

WORKDIR /app

COPY --from=base-image /app/builder/dist/apps/share-a-meal-ui ./share-a-meal-ui
COPY --from=base-image /app/builder/apps/share-a-meal-ui/server.js ./
COPY --from=base-image /app/builder/node_modules ./node_modules

# RUN npm i express compression

ENV NODE_ENV=$NODE_ENV

CMD ["node", "./server.js"]