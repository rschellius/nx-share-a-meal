FROM my-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build share-a-meal-ui ${BUILD_FLAG}

FROM my-base-image:nx-base

WORKDIR /app

COPY --from=builder /app/builder/dist/apps/share-a-meal-ui ./share-a-meal-ui
COPY --from=builder /app/builder/apps/share-a-meal-ui/server.js ./

RUN npm i express compression

ENV NODE_ENV=$NODE_ENV

CMD ["node", "./server.js"]