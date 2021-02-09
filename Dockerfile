FROM node:lts-alpine

WORKDIR /opt/app

ENV PORT=80

RUN echo 'crond' > /boot.sh

COPY package*.json ./

RUN npm install --production

COPY . .

WORKDIR /opt/app/nodered

RUN npm install --production

WORKDIR /opt/app

CMD sh /boot.sh && npm start
