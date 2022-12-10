FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*
  
USER node

EXPOSE 3000

CMD npm run dev