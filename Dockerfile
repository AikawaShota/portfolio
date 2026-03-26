FROM node:24-alpine
WORKDIR /usr/src/app
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
CMD ["npm", "run", "dev"]
