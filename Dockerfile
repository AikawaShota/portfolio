FROM node:26-alpine
WORKDIR /usr/src/app
COPY ./frontend/package.json ./frontend/pnpm-lock.yaml ./
RUN npm install --global pnpm@10.15.0 && pnpm install --frozen-lockfile
CMD ["pnpm", "run", "dev"]
