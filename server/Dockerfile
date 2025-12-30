# Fase di build
FROM node:18-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose the API Server
EXPOSE 3001
USER node
CMD ["npm", "run", "start"]