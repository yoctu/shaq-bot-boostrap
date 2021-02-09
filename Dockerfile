FROM node:current-alpine

WORKDIR /opt/app

ENV PORT=80

RUN apk update && apk add --no-cache python make g++

RUN echo 'crond' > /boot.sh

COPY package*.json ./

RUN npm install --production

COPY . .

WORKDIR /opt/app/nodered

RUN npm install --production

RUN apk del python make g++

WORKDIR /opt/app

CMD sh /boot.sh && npm start
