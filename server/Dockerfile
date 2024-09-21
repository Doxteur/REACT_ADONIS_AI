FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3333

CMD ["node", "build/server.js"]
