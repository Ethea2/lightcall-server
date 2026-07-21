# syntax=docker/dockerfile:1

# ---- base: shared dependency layer ----
FROM node:20-bookworm-slim AS base
WORKDIR /app
COPY package*.json ./

# ---- dev: full deps (incl. nodemon/tsx), source mounted at runtime ----
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# ---- build: compile TypeScript for production ----
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# ---- prod: slim runtime, compiled output only, no dev deps ----
FROM node:20-bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
