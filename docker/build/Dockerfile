FROM node:20.12.0-bullseye-slim as build-stage

ARG VITE_APP_API_BASE_URL="REPLACE_HARDCODE_VITE_APP_API_BASE_URL"
ARG VITE_APP_GRAPHQL_ENTRY="REPLACE_HARDCODE_VITE_APP_GRAPHQL_ENTRY"

ENV VITE_APP_API_BASE_URL=${VITE_APP_API_BASE_URL}
ENV VITE_APP_GRAPHQL_ENTRY=${VITE_APP_GRAPHQL_ENTRY}

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM busybox:latest
RUN mkdir /app
COPY --from=build-stage /app/dist /app

FROM nginx:1.23-alpine

STOPSIGNAL SIGQUIT

WORKDIR /srv/www

RUN chmod 777 /srv/www
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/entrypoint.sh /app/entrypoint.sh
COPY --from=build-stage /app/dist /srv/www/
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/bin/sh", "-c", "/app/entrypoint.sh" ]
