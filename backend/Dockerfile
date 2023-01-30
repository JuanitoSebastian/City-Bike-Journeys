FROM node:16

RUN mkdir -p /usr/src/app/build && chown -R node:node /usr/src/app/build

RUN mkdir -p /usr/src/app/data && chown -R node:node /usr/src/app/data

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*

USER node

RUN npm run tsc

CMD npm start