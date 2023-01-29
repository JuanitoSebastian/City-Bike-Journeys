
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

ARG API_URL

ENV API_URL=$API_URL

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build-stage /usr/src/app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf