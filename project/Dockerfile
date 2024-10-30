FROM node:21-alpine

ARG VITE_API_URL
ARG VITE_API_WEBSITE_VERSION
ARG VITE_API_CUSTOMER_URL

ENV VITE_API_URL=https://paradise-api.up.railway.app
ENV VITE_API_WEBSITE_VERSION=0.2
ENV VITE_API_CUSTOMER_URL=https://paradise-dev.punyakon.net


WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm","run","preview" ]