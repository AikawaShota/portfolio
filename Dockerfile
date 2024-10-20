FROM node:20-alpine
WORKDIR /usr/src/app
COPY ./portfolio-vite/package.json ./portfolio-vite/package-lock.json ./
RUN npm install
CMD ["npm", "run", "dev"]
