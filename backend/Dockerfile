FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*
  
USER node

RUN npm run tsc

CMD npm start