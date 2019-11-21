# Stage 1 - the build process
FROM node:lts
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm run install
COPY . ./
RUN npm run build