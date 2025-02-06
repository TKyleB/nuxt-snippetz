FROM node:22.13.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.13.1-alpine
WORKDIR /app
COPY --from=builder /app/.output .

CMD [ "node", "./server/index.mjs" ]
