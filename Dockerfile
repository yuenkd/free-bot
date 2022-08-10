FROM node:lts-alpine as build

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:lts-alpine

WORKDIR /opt/free-bot

COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/dist .

CMD [ "node", "./index.js" ]
