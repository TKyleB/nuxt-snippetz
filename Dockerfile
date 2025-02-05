FROM node:22.13.1-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .
RUN npm run build

FROM node:22.13.1-alpine
WORKDIR /app
COPY --from=builder /app/.output /app/.output

CMD [ "node", "/app/.output/server/index.mjs" ]