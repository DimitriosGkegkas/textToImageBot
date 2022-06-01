FROM node:14

WORKDIR /panel

COPY package*.json ./
RUN npm install
RUN npm run lint

COPY . ./
RUN npm run build
