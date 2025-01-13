FROM oven/bun:slim AS builder

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:slim

WORKDIR /app

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "server.js"]