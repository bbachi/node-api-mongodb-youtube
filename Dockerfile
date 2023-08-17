# from the base node image
FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY ./ .

EXPOSE 4000

CMD ["npm", "run", "start:prod"]