# Stage 1 - the build process
FROM node:lts
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install
COPY . ./

ARG NY_API_HOST
ENV NY_API_HOST $NY_API_HOST

RUN npm run build