FROM node:20.11-alpine as dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM node:20.11-alpine as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /myApp/node_modules ./node_modules
RUN pnpm build:production

FROM node:20.11-alpine as runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /myApp/next.config.mjs ./
COPY --from=builder /myApp/public ./public
COPY --from=builder /myApp/.next ./.next
COPY --from=builder /myApp/node_modules ./node_modules
COPY --from=builder /myApp/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]