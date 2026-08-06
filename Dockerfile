FROM node:24-alpine
WORKDIR /usr/src/app
COPY ./frontend/package.json ./frontend/pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
CMD ["pnpm", "run", "dev"]
