FROM node:20-alpine AS base
WORKDIR /app/
COPY package*.json tsconfig.json next.config.js ./

FROM base AS builder
RUN npm install
COPY src ./
RUN npm run build

FROM base AS runner
EXPOSE 3000
RUN npm install --production
COPY --from=builder ./app/.next .next
COPY public public
CMD ["npm", "run", "start"]