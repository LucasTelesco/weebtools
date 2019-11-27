FROM node:latest
WORKDIR /src
COPY package*.json ./
RUN ls
RUN npm install
EXPOSE 3000 