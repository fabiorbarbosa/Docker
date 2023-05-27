FROM node:16 as builder-stage
WORKDIR /usr/build
COPY package.json tsconfig.json ./
RUN npm install
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]