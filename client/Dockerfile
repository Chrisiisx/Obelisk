FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production


COPY . .

# expose development port (default 5173)
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]